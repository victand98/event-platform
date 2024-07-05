import { User } from '../user';

type UserSignInResponse = User & { token: string };

export type { UserSignInResponse };
