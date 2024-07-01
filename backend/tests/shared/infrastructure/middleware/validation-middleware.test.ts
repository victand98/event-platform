import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { ValidationError, validationMiddleware, Validator } from '../../../../src/shared';

describe('validationMiddleware', () => {
  let validator: jest.Mocked<Validator<string>>;

  beforeEach(() => {
    validator = {
      validate: jest.fn().mockReturnValue([]),
    };

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

  it('should throw a ValidationError when the validation is unsuccessful', () => {
    const middleware = validationMiddleware(validator);

    const req = getMockReq({
      body: faker.lorem.word(),
    });
    const { res, next } = getMockRes();

    validator.validate.mockReturnValueOnce([
      {
        message: faker.lorem.sentence(),
        field: faker.lorem.word(),
      },
    ]);

    expect(() => middleware(req, res, next)).toThrow(ValidationError);
  });
});
