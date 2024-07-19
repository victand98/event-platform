import {
  APIError,
  apiUserRepository,
  UserSignInData,
  UserSignUpData,
} from '@/modules';
import fetchMock from 'jest-fetch-mock';
import { generateTestData } from '../../../../../__utils__';

describe('apiUserRepository', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('signIn', () => {
    it('should return a user when sign in is successful', async () => {
      const data = generateTestData('user');
      const signInData: UserSignInData = {
        email: data.email,
        password: data.password,
      };
      const response = data;
      fetchMock.mockResponseOnce(JSON.stringify(response));

      const signIn = apiUserRepository().signIn;
      const result = await signIn(signInData);

      expect(JSON.stringify(result)).toEqual(JSON.stringify(response));
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an API error when sign in fails', async () => {
      const data = generateTestData('user');
      const signInData: UserSignInData = {
        email: data.email,
        password: data.password,
      };
      const apiError = generateTestData('apiError');
      const { errors, statusCode } = apiError;

      fetchMock.mockResponseOnce(JSON.stringify({ errors }), {
        status: statusCode,
      });

      const signIn = apiUserRepository().signIn;

      await expect(signIn(signInData)).rejects.toThrow(APIError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when fetch fails', async () => {
      const data = generateTestData('user');
      const signInData: UserSignInData = {
        email: data.email,
        password: data.password,
      };
      const error = new Error('Failed to fetch');
      fetchMock.mockRejectOnce(error);

      const signIn = apiUserRepository().signIn;

      await expect(signIn(signInData)).rejects.toThrow(error.message);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error with Unknown error message when response has no errors array', async () => {
      const data = generateTestData('user');
      const signInData: UserSignInData = {
        email: data.email,
        password: data.password,
      };
      const apiError = generateTestData('apiError');
      const { statusCode } = apiError;

      fetchMock.mockResponseOnce(JSON.stringify({}), {
        status: statusCode,
      });

      const signIn = apiUserRepository().signIn;

      await expect(signIn(signInData)).rejects.toThrow('Unknown error');
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('signUp', () => {
    it('should return a user when sign up is successful', async () => {
      const data = generateTestData('user');
      const signUpData: UserSignUpData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      };
      const response = data;
      fetchMock.mockResponseOnce(JSON.stringify(response));

      const signUp = apiUserRepository().signUp;
      const result = await signUp(signUpData);

      expect(JSON.stringify(result)).toEqual(JSON.stringify(response));
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an API error when sign up fails', async () => {
      const data = generateTestData('user');
      const signUpData: UserSignUpData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      };
      const apiError = generateTestData('apiError');
      const { errors, statusCode } = apiError;

      fetchMock.mockResponseOnce(JSON.stringify({ errors }), {
        status: statusCode,
      });

      const signUp = apiUserRepository().signUp;

      await expect(signUp(signUpData)).rejects.toThrow(APIError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when fetch fails', async () => {
      const data = generateTestData('user');
      const signUpData: UserSignUpData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      };
      const error = new Error('Failed to fetch');
      fetchMock.mockRejectOnce(error);

      const signUp = apiUserRepository().signUp;

      await expect(signUp(signUpData)).rejects.toThrow(error.message);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
