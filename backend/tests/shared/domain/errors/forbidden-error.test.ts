import { CustomError, ForbiddenError, StatusCode } from '../../../../src/shared';

describe('ForbiddenError', () => {
  it('should be defined', () => {
    const error = new ForbiddenError();

    expect(error).toBeDefined();
  });

  it('should create the error with the default message', () => {
    const error = new ForbiddenError();

    expect(error.message).toBe('Forbidden');
  });

  it('should create the error with the default name', () => {
    const error = new ForbiddenError();

    expect(error.name).toBe('Forbidden');
  });

  it('should create the error with the default loggable value', () => {
    const error = new ForbiddenError();

    expect(error.loggable).toBe(false);
  });

  it('should create the error with the passed message', () => {
    const message = 'Custom message';
    const error = new ForbiddenError({ message });

    expect(error.message).toBe(message);
  });

  it('should create the error with the passed name', () => {
    const name = 'Custom name';
    const error = new ForbiddenError({ name });

    expect(error.name).toBe(name);
  });

  it('should create the error with the passed loggable value', () => {
    const loggable = true;
    const error = new ForbiddenError({ loggable });

    expect(error.loggable).toBe(loggable);
  });

  it('should return an array with the error message', () => {
    const error = new ForbiddenError();

    expect(error.serializeErrors()).toEqual([{ message: error.message }]);
  });

  it('should have the status code property set to 403', () => {
    const error = new ForbiddenError();

    expect(error.statusCode).toBe(StatusCode.FORBIDDEN);
  });

  it('should have the prototype of CustomError', () => {
    const error = new ForbiddenError();

    expect(Object.getPrototypeOf(Object.getPrototypeOf(error))).toBe(CustomError.prototype);
  });
});
