import { CustomError, StatusCode, ValidationError } from '../../../../src/shared';

describe('ValidationError', () => {
  it('should be defined', () => {
    const error = new ValidationError({ errors: [] });

    expect(error).toBeDefined();
  });

  it('should create the error with the default message', () => {
    const error = new ValidationError({ errors: [] });

    expect(error.message).toBe('A validation error occurred');
  });

  it('should create the error with the default name', () => {
    const error = new ValidationError({ errors: [] });

    expect(error.name).toBe('Validation Error');
  });

  it('should create the error with the default loggable value', () => {
    const error = new ValidationError({ errors: [] });

    expect(error.loggable).toBe(false);
  });

  it('should create the error with the passed message', () => {
    const message = 'Custom message';
    const error = new ValidationError({ message, errors: [] });

    expect(error.message).toBe(message);
  });

  it('should create the error with the passed name', () => {
    const name = 'Custom name';
    const error = new ValidationError({ name, errors: [] });

    expect(error.name).toBe(name);
  });

  it('should create the error with the passed loggable value', () => {
    const loggable = true;
    const error = new ValidationError({ loggable, errors: [] });

    expect(error.loggable).toBe(loggable);
  });

  it('should return an array with the passed errors', () => {
    const errors = [{ message: 'Error 1' }, { message: 'Error 2' }];
    const error = new ValidationError({ errors });

    expect(error.serializeErrors()).toEqual(errors);
  });

  it('should have the status code property set to 400', () => {
    const error = new ValidationError({ errors: [] });

    expect(error.statusCode).toBe(StatusCode.BAD_REQUEST);
  });

  it('should have the prototype of CustomError', () => {
    const error = new ValidationError({ errors: [] });

    expect(Object.getPrototypeOf(Object.getPrototypeOf(error))).toBe(CustomError.prototype);
  });
});
