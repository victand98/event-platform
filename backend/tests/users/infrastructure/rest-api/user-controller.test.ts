import { getMockReq, getMockRes } from '@jest-mock/express';

import { StatusCode } from '../../../../src/shared';
import { SignUpUseCase, UserController } from '../../../../src/users';
import { generateTestData } from '../../../utils';

describe('UserController', () => {
  let controller: UserController;
  let signUpUseCase: jest.Mocked<SignUpUseCase>;

  beforeEach(() => {
    signUpUseCase = {
      run: jest.fn(),
    } as unknown as jest.Mocked<SignUpUseCase>;
    controller = new UserController(signUpUseCase);

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
});
