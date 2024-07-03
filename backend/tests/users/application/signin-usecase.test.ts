import { faker } from '@faker-js/faker';

import { Jwt, PasswordEncoder } from '../../../src/shared';
import { SignInUseCase, UserRepository } from '../../../src/users';
import { createMockJwt } from '../../shared/domain/__mocks__/mock-jwt';
import { createMockPasswordEncoder } from '../../shared/domain/__mocks__/mock-password-encoder';
import { generateTestData } from '../../utils';
import { createMockUserRepository } from '../domain/__mocks__/mock-user-repository';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let passwordEncoder: jest.Mocked<PasswordEncoder>;
  let jwt: jest.Mocked<Jwt>;

  beforeEach(() => {
    userRepository = createMockUserRepository();
    passwordEncoder = createMockPasswordEncoder();
    jwt = createMockJwt();

    signInUseCase = new SignInUseCase(userRepository, passwordEncoder, jwt);

    jest.clearAllMocks();
  });

  describe('run', () => {
    it('should return the user data and a token when the user exists', async () => {
      const userData = generateTestData('user');
      const token = faker.string.sample();
      const user = { ...userData, token };

      userRepository.getByEmail.mockResolvedValue(userData);
      passwordEncoder.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(token);

      expect(await signInUseCase.run(userData.email, userData.password)).toEqual(user);

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(passwordEncoder.compare).toHaveBeenCalledWith(userData.password, userData.password);
      expect(jwt.sign).toHaveBeenCalledWith({ id: userData.id, role: userData.role });
    });

    it('should throw an error when the user does not exist', async () => {
      const userData = generateTestData('user');
      userRepository.getByEmail.mockResolvedValue(null);

      await expect(signInUseCase.run(userData.email, userData.password)).rejects.toThrow();

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(passwordEncoder.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw an error when the password is invalid', async () => {
      const userData = generateTestData('user');
      userRepository.getByEmail.mockResolvedValue(userData);
      passwordEncoder.compare.mockResolvedValue(false);

      await expect(signInUseCase.run(userData.email, userData.password)).rejects.toThrow();

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(passwordEncoder.compare).toHaveBeenCalledWith(userData.password, userData.password);
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});
