import { getMockReq, getMockRes } from '@jest-mock/express';

import { CurrentUserMiddleware, Jwt } from '../../../../src/shared';
import { createMockJwt } from '../../domain/__mocks__/mock-jwt';

describe('CurrentUserMiddleware', () => {
  let currentUserMiddleware: CurrentUserMiddleware;
  let jwt: jest.Mocked<Jwt>;

  beforeEach(() => {
    jwt = createMockJwt();
    currentUserMiddleware = new CurrentUserMiddleware(jwt);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(currentUserMiddleware).toBeDefined();
  });

  describe('handle', () => {
    it('should set the current user in the request when the token is valid', () => {
      const req = getMockReq({ headers: { authorization: 'Bearer token' } });
      const { res, next } = getMockRes();
      const currentUser = { id: 'id', role: 'role' };

      jwt.verify.mockReturnValue(currentUser);

      currentUserMiddleware.handle(req, res, next);

      expect(req.currentUser).toEqual(currentUser);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should set the current user as null in the request when the token is invalid', () => {
      const req = getMockReq({ headers: { authorization: 'Bearer token' } });
      const { res, next } = getMockRes();

      jwt.verify.mockReturnValue(null);

      currentUserMiddleware.handle(req, res, next);

      expect(req.currentUser).toBeNull();
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should not set the current user in the request when the token is not present', () => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      currentUserMiddleware.handle(req, res, next);

      expect(req.currentUser).toBeUndefined();
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
