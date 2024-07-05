import { CustomError } from '@/modules';
import {
  UserRepository,
  UserSignInData,
  UserSignInResponse,
} from '../../domain';

const apiUserRepository = (): UserRepository => {
  const signIn = async (
    data: UserSignInData
  ): Promise<UserSignInResponse | CustomError> => {
    const { email, password } = data;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/users/sign-in`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  return { signIn };
};

export { apiUserRepository };
