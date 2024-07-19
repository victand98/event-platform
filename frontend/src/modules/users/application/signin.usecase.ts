import { UserRepository, UserSignInData, UserSignInResponse } from '../domain';

const signInUseCase = (userRepository: UserRepository) => {
  return async (data: UserSignInData): Promise<UserSignInResponse> => {
    return await userRepository.signIn(data);
  };
};

export { signInUseCase };
