import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { StatusCode } from '../../../../src/shared';
import { SignInUseCase, SignUpUseCase, UserController } from '../../../../src/users';
import { generateTestData } from '../../../utils';

describe('UserController', () => {
  let controller: UserController;
  let signUpUseCase: jest.Mocked<SignUpUseCase>;
  let signInUseCase: jest.Mocked<SignInUseCase>;

  beforeEach(() => {
    signUpUseCase = {
      run: jest.fn(),
    } as unknown as jest.Mocked<SignUpUseCase>;
    signInUseCase = {
      run: jest.fn(),
    } as unknown as jest.Mocked<SignInUseCase>;
    controller = new UserController(signUpUseCase, signInUseCase);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should have the user data in the request body', async () => {
      const userData = generateTestData('user');
      const req = getMockReq({ body: userData });
      const { res } = getMockRes();

      await controller.signUp(req, res);

      expect(req.body).toBeDefined();
    });

    it('should return the user data in the response', async () => {
      const userData = generateTestData('user');
      const req = getMockReq({ body: userData });
      const { res } = getMockRes();

      signUpUseCase.run.mockResolvedValue(userData);

      await controller.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
      expect(res.json).toHaveBeenCalledWith(userData);
    });

    it('should throw an error when the user creation fails', async () => {
      const userData = generateTestData('user');
      const req = getMockReq({ body: userData });
      const { res } = getMockRes();

      signUpUseCase.run.mockRejectedValue(new Error());

      await expect(controller.signUp(req, res)).rejects.toThrow();
    });
  });

  describe('signIn', () => {
    it('should have the user data in the request body', async () => {
      const userData = generateTestData('user');
      const req = getMockReq({ body: userData });
      const { res } = getMockRes();

      await controller.signIn(req, res);

      expect(req.body).toBeDefined();
    });

    it('should return the user data in the response', async () => {
      const userData = generateTestData('user');
      const token = faker.string.sample();
      const response = { ...userData, token };
      const req = getMockReq({ body: userData });
      const { res } = getMockRes();

      signInUseCase.run.mockResolvedValue(response);

      await controller.signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should throw an error when the user creation fails', async () => {
      const userData = generateTestData('user');
      const req = getMockReq({ body: userData });
      const { res } = getMockRes();

      signInUseCase.run.mockRejectedValue(new Error());

      await expect(controller.signIn(req, res)).rejects.toThrow();
    });
  });
});
