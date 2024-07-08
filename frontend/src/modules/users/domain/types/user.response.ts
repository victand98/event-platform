import { User } from '../user';

type UserSignInResponse = User & { token: string };

type UserSignUpResponse = User;

export type { UserSignInResponse, UserSignUpResponse };
