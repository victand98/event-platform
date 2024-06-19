import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { validationMiddleware, Validator } from '../../../../src/shared';

describe('validationMiddleware', () => {
  let validator: jest.Mocked<Validator<string>>;

  beforeEach(() => {
    validator = { validate: jest.fn() };

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(validationMiddleware).toBeDefined();
  });

  it('should return a function when a validator is given', () => {
    const middleware = validationMiddleware(validator);

    expect(middleware).toBeInstanceOf(Function);
  });

  it('should call the validate method of the validator when a request is given', () => {
    const middleware = validationMiddleware(validator);

    const req = getMockReq({
      body: faker.lorem.word(),
    });
    const { res, next } = getMockRes();

    middleware(req, res, next);

    expect(validator.validate).toHaveBeenCalledTimes(1);
    expect(validator.validate).toHaveBeenCalledWith(req.body);
  });

  it('should call the next function when the validation is successful', () => {
    const middleware = validationMiddleware(validator);

    const req = getMockReq({
      body: faker.lorem.word(),
    });
    const { res, next } = getMockRes();

    middleware(req, res, next);

    expect(validator.validate).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call the next function with an error when the validation fails', () => {
    const middleware = validationMiddleware(validator);

    const req = getMockReq({
      body: 123 as unknown as string,
    });
    const { res, next } = getMockRes();

    const error = new Error('validation error');
    validator.validate.mockImplementation(() => {
      throw error;
    });

    middleware(req, res, next);

    expect(validator.validate).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });
});
