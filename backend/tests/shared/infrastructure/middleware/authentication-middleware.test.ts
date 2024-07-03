import { getMockReq, getMockRes } from '@jest-mock/express';

import { AuthenticationMiddleware, NotAuthorizedError } from '../../../../src/shared';

describe('AuthenticationMiddleware', () => {
  let authenticationMiddleware: AuthenticationMiddleware;

  beforeEach(() => {
    authenticationMiddleware = new AuthenticationMiddleware();

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authenticationMiddleware).toBeDefined();
  });

  describe('handle', () => {
    it('should throw an error when the current user is not defined', () => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      expect(() => authenticationMiddleware.handle(req, res, next)).toThrow();
    });

    it('should call the next function when the current user is defined', () => {
      const req = getMockReq({ currentUser: {} });
      const { res, next } = getMockRes();

      authenticationMiddleware.handle(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotAuthorizedError when the current user is not defined', () => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      expect(() => authenticationMiddleware.handle(req, res, next)).toThrow();
      expect(() => authenticationMiddleware.handle(req, res, next)).toThrow(NotAuthorizedError);
    });
  });
});
