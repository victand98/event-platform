import { getMockReq, getMockRes } from '@jest-mock/express';

import { BadRequestError, ErrorMiddleware, Logger, StatusCode } from '../../../../src/shared';
import { createMockLogger } from '../../domain/__mocks__/mock-logger';

describe('ErrorMiddleware', () => {
  let errorMiddleware: ErrorMiddleware;
  let logger: jest.Mocked<Logger>;

  beforeEach(() => {
    logger = createMockLogger();
    errorMiddleware = new ErrorMiddleware(logger);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(errorMiddleware).toBeDefined();
  });

  describe('handle', () => {
    it('should log the error when it is an instance of CustomError and loggable', () => {
      const error = new BadRequestError({ message: 'Bad request', loggable: true });
      const req = getMockReq();
      const { res, next } = getMockRes();

      errorMiddleware.handle(error, req, res, next);

      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith({
        context: {
          message: error.message,
          name: error.name,
          stack: error.stack,
        },
        message: error.message,
      });
    });

    it('should not log the error when it is an instance of CustomError and not loggable', () => {
      const error = new BadRequestError({ message: 'Bad request', loggable: false });
      const req = getMockReq();
      const { res, next } = getMockRes();

      errorMiddleware.handle(error, req, res, next);

      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should return the error when it is an instance of CustomError', () => {
      const error = new BadRequestError({ message: 'Bad request' });
      const req = getMockReq();
      const { res, next } = getMockRes();

      errorMiddleware.handle(error, req, res, next);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(error.statusCode);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ errors: error.serializeErrors() });
    });

    it('should return an internal server error when the error is not an instance of CustomError', () => {
      const error = new Error('Internal server error');
      const req = getMockReq();
      const { res, next } = getMockRes();

      errorMiddleware.handle(error, req, res, next);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ errors: [{ message: 'Something went wrong' }] });
    });
  });

  it('should call the next function', () => {
    const error = new BadRequestError({ message: 'Bad request' });
    const req = getMockReq();
    const { res, next } = getMockRes();

    errorMiddleware.handle(error, req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
