import { CustomError } from '@/modules';
import {
  UserSignInData,
  UserSignInResponse,
  UserSignUpData,
  UserSignUpResponse,
} from './types';

interface UserRepository {
  signIn(data: UserSignInData): Promise<UserSignInResponse | CustomError>;
  signUp(data: UserSignUpData): Promise<UserSignUpResponse>;
}

export type { UserRepository };
