import { CustomError, NotAuthorizedError, StatusCode } from '../../../../src/shared';

describe('NotAuthorizedError', () => {
  it('should be defined', () => {
    const error = new NotAuthorizedError();

    expect(error).toBeDefined();
  });

  it('should create the error with the default message', () => {
    const error = new NotAuthorizedError();

    expect(error.message).toBe('Not Authorized');
  });

  it('should create the error with the default name', () => {
    const error = new NotAuthorizedError();

    expect(error.name).toBe('Not Authorized');
  });

  it('should create the error with the default loggable value', () => {
    const error = new NotAuthorizedError();

    expect(error.loggable).toBe(false);
  });

  it('should create the error with the passed message', () => {
    const message = 'Custom message';
    const error = new NotAuthorizedError({ message });

    expect(error.message).toBe(message);
  });

  it('should create the error with the passed name', () => {
    const name = 'Custom name';
    const error = new NotAuthorizedError({ name });

    expect(error.name).toBe(name);
  });

  it('should create the error with the passed loggable value', () => {
    const loggable = true;
    const error = new NotAuthorizedError({ loggable });

    expect(error.loggable).toBe(loggable);
  });

  it('should return an array with the error message', () => {
    const error = new NotAuthorizedError();

    expect(error.serializeErrors()).toEqual([{ message: error.message }]);
  });

  it('should have the status code property set to 401', () => {
    const error = new NotAuthorizedError();

    expect(error.statusCode).toBe(StatusCode.UNAUTHORIZED);
  });

  it('should have the prototype of CustomError', () => {
    const error = new NotAuthorizedError();

    expect(Object.getPrototypeOf(Object.getPrototypeOf(error))).toBe(CustomError.prototype);
  });
});
