import { CustomError } from '@/modules';
import { UserSignInData, UserSignInResponse } from './types';

interface UserRepository {
  signIn(data: UserSignInData): Promise<UserSignInResponse | CustomError>;
}

export type { UserRepository };
