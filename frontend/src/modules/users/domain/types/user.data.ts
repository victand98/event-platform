import { User } from '../user';

type UserSignInData = Pick<User, 'email' | 'password'>;

export type { UserSignInData };
