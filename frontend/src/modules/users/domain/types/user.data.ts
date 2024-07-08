import { User } from '../user';

type UserSignInData = Pick<User, 'email' | 'password'>;

type UserSignUpData = Pick<
  User,
  'email' | 'password' | 'firstName' | 'lastName'
>;

export type { UserSignInData, UserSignUpData };
