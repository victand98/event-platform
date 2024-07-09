import { signUpUseCase, UserRepository, UserSignUpData } from '@/modules';
import { createMockUserRepository } from '../../../../__mocks__';
import { generateTestData } from '../../../../__utils__';

describe('signUpUseCase', () => {
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = createMockUserRepository();
    jest.clearAllMocks();
  });

  it('should return a user when sign up is successful', async () => {
    const data = generateTestData('user');
    const signUpData: UserSignUpData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    userRepository.signUp.mockResolvedValue(data);

    const signUp = signUpUseCase(userRepository);
    const response = await signUp(signUpData);

    expect(response).toEqual(data);
    expect(userRepository.signUp).toHaveBeenCalledTimes(1);
    expect(userRepository.signUp).toHaveBeenCalledWith(signUpData);
  });

  it('should throw an error when sign up fails', async () => {
    const data = generateTestData('user');
    const signUpData: UserSignUpData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    const error = new Error('Failed to sign up');
    userRepository.signUp.mockRejectedValue(error);

    const signUp = signUpUseCase(userRepository);

    await expect(signUp(signUpData)).rejects.toThrow(error.message);
    expect(userRepository.signUp).toHaveBeenCalledTimes(1);
    expect(userRepository.signUp).toHaveBeenCalledWith(signUpData);
  });
});
