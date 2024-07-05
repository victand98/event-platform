import { CustomError } from '@/modules/shared';
import { UserRepository, UserSignInData, UserSignInResponse } from '../domain';

const signInUseCase = (userRepository: UserRepository) => {
  return async (
    data: UserSignInData
  ): Promise<UserSignInResponse | CustomError> => {
    return await userRepository.signIn(data);
  };
};

export { signInUseCase };
