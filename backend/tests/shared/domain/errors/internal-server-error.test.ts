import { CustomError, InternalServerError, StatusCode } from '../../../../src/shared';

describe('InternalServerError', () => {
  it('should be defined', () => {
    const error = new InternalServerError();

    expect(error).toBeDefined();
  });

  it('should create the error with the default message', () => {
    const error = new InternalServerError();

    expect(error.message).toBe('Internal Server Error');
  });

  it('should create the error with the default name', () => {
    const error = new InternalServerError();

    expect(error.name).toBe('Internal Server Error');
  });

  it('should create the error with the default loggable value', () => {
    const error = new InternalServerError();

    expect(error.loggable).toBe(false);
  });

  it('should create the error with the passed message', () => {
    const message = 'Custom message';
    const error = new InternalServerError({ message });

    expect(error.message).toBe(message);
  });

  it('should create the error with the passed name', () => {
    const name = 'Custom name';
    const error = new InternalServerError({ name });

    expect(error.name).toBe(name);
  });

  it('should create the error with the passed loggable value', () => {
    const loggable = true;
    const error = new InternalServerError({ loggable });

    expect(error.loggable).toBe(loggable);
  });

  it('should return an array with the error message', () => {
    const error = new InternalServerError();

    expect(error.serializeErrors()).toEqual([{ message: error.message }]);
  });

  it('should have the status code property set to 500', () => {
    const error = new InternalServerError();

    expect(error.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
  });

  it('should have the prototype of CustomError', () => {
    const error = new InternalServerError();

    expect(Object.getPrototypeOf(Object.getPrototypeOf(error))).toBe(CustomError.prototype);
  });
});
