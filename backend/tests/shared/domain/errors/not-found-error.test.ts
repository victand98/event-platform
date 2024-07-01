import { CustomError, NotFoundError, StatusCode } from '../../../../src/shared';

describe('NotFoundError', () => {
  it('should be defined', () => {
    const error = new NotFoundError();

    expect(error).toBeDefined();
  });

  it('should create the error with the default message', () => {
    const error = new NotFoundError();

    expect(error.message).toBe('The requested resource was not found');
  });

  it('should create the error with the default name', () => {
    const error = new NotFoundError();

    expect(error.name).toBe('Not Found');
  });

  it('should create the error with the default loggable value', () => {
    const error = new NotFoundError();

    expect(error.loggable).toBe(false);
  });

  it('should create the error with the passed message', () => {
    const message = 'Custom message';
    const error = new NotFoundError({ message });

    expect(error.message).toBe(message);
  });

  it('should create the error with the passed name', () => {
    const name = 'Custom name';
    const error = new NotFoundError({ name });

    expect(error.name).toBe(name);
  });

  it('should create the error with the passed loggable value', () => {
    const loggable = true;
    const error = new NotFoundError({ loggable });

    expect(error.loggable).toBe(loggable);
  });

  it('should return an array with the error message', () => {
    const error = new NotFoundError();

    expect(error.serializeErrors()).toEqual([{ message: error.message }]);
  });

  it('should have the status code property set to 404', () => {
    const error = new NotFoundError();

    expect(error.statusCode).toBe(StatusCode.NOT_FOUND);
  });

  it('should have the prototype of CustomError', () => {
    const error = new NotFoundError();

    expect(Object.getPrototypeOf(Object.getPrototypeOf(error))).toBe(CustomError.prototype);
  });
});
