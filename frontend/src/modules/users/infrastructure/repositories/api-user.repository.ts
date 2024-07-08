import { APIError } from '@/modules';
import {
  UserRepository,
  UserSignInData,
  UserSignInResponse,
  UserSignUpData,
  UserSignUpResponse,
} from '../../domain';

const apiUserRepository = (): UserRepository => {
  const signIn = async (data: UserSignInData): Promise<UserSignInResponse> => {
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
    if (!response.ok) {
      throw new APIError(jsonResponse);
    }
    return jsonResponse;
  };

  const signUp = async (data: UserSignUpData): Promise<UserSignUpResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/users/sign-up`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new APIError(jsonResponse);
    }
    return jsonResponse;
  };

  return { signIn, signUp };
};

export { apiUserRepository };
