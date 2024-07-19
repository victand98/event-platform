import { signInUseCase, UserRepository, UserSignInData } from '@/modules';
import { createMockUserRepository } from '../../../../__mocks__';
import { generateTestData } from '../../../../__utils__';

describe('signInUseCase', () => {
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = createMockUserRepository();
    jest.clearAllMocks();
  });

  it('should return a user when sign in is successful', async () => {
    const data = generateTestData('user');
    const signInData: UserSignInData = {
      email: data.email,
      password: data.password,
    };
    userRepository.signIn.mockResolvedValue({ ...data, token: 'token' });

    const signIn = signInUseCase(userRepository);
    const response = await signIn(signInData);

    expect(response).toEqual({ ...data, token: 'token' });
    expect(userRepository.signIn).toHaveBeenCalledTimes(1);
    expect(userRepository.signIn).toHaveBeenCalledWith(signInData);
  });

  it('should throw an error when sign in fails', async () => {
    const data = generateTestData('user');
    const signInData: UserSignInData = {
      email: data.email,
      password: data.password,
    };
    const error = new Error('Failed to sign in');
    userRepository.signIn.mockRejectedValue(error);

    const signIn = signInUseCase(userRepository);

    await expect(signIn(signInData)).rejects.toThrow(error.message);
    expect(userRepository.signIn).toHaveBeenCalledTimes(1);
    expect(userRepository.signIn).toHaveBeenCalledWith(signInData);
  });
});
