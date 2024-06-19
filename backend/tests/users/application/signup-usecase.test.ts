import { faker } from '@faker-js/faker';

import { Logger, PasswordEncoder } from '../../../src/shared';
import { SignUpUseCase, UserRepository } from '../../../src/users';
import { createMockLogger } from '../../shared/domain/__mocks__/mock-logger';
import { createMockPasswordEncoder } from '../../shared/domain/__mocks__/mock-password-encoder';
import { generateTestData } from '../../utils';
import { createMockUserRepository } from '../domain/__mocks__/mock-user-repository';

describe('SignUpUseCase', () => {
  let signUpUseCase: SignUpUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let logger: jest.Mocked<Logger>;
  let passwordEncoder: jest.Mocked<PasswordEncoder>;

  beforeEach(() => {
    userRepository = createMockUserRepository();
    logger = createMockLogger();
    passwordEncoder = createMockPasswordEncoder();

    signUpUseCase = new SignUpUseCase(userRepository, logger, passwordEncoder);

    jest.clearAllMocks();
  });

  describe('run', () => {
    it('should create a new user when the user does not exist', async () => {
      const userData = generateTestData('user');
      const encodedPassword = faker.internet.password();
      const newUser = { ...userData, password: encodedPassword };

      userRepository.getByEmail.mockResolvedValue(null);
      passwordEncoder.encode.mockResolvedValue(encodedPassword);
      userRepository.create.mockResolvedValue(newUser);

      expect(await signUpUseCase.run(userData)).toEqual(newUser);

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(passwordEncoder.encode).toHaveBeenCalledWith(userData.password);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should throw an error when the user already exists', async () => {
      const userData = generateTestData('user');
      userRepository.getByEmail.mockResolvedValue(userData);

      await expect(signUpUseCase.run(userData)).rejects.toThrow();

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(passwordEncoder.encode).not.toHaveBeenCalled();
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the user creation fails', async () => {
      const userData = generateTestData('user');
      const encodedPassword = faker.internet.password();

      userRepository.getByEmail.mockResolvedValue(null);
      passwordEncoder.encode.mockResolvedValue(encodedPassword);
      userRepository.create.mockRejectedValue(new Error());

      await expect(signUpUseCase.run(userData)).rejects.toThrow();

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(passwordEncoder.encode).toHaveBeenCalledWith(userData.password);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(logger.error).not.toHaveBeenCalled();
    });
  });
});
