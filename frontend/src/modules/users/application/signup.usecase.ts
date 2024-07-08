import { UserRepository, UserSignUpData, UserSignUpResponse } from '../domain';

const signUpUseCase = (userRepository: UserRepository) => {
  return async (data: UserSignUpData): Promise<UserSignUpResponse> => {
    return await userRepository.signUp(data);
  };
};

export { signUpUseCase };
