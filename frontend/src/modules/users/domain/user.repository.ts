import {
  UserSignInData,
  UserSignInResponse,
  UserSignUpData,
  UserSignUpResponse,
} from './types';

interface UserRepository {
  signIn(data: UserSignInData): Promise<UserSignInResponse>;
  signUp(data: UserSignUpData): Promise<UserSignUpResponse>;
}

export type { UserRepository };
