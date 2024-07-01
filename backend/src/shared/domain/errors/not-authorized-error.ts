import { StatusCode } from '../status-code';
import { CustomError, SerializableError } from './custom-error';

interface NotAuthorizedErrorArgs {
  message?: string;
  name?: string;
  loggable?: boolean;
}

class NotAuthorizedError extends CustomError {
  name: string;
  loggable: boolean;
  statusCode: number = StatusCode.UNAUTHORIZED;

  constructor(args?: NotAuthorizedErrorArgs) {
    const { message = 'Not Authorized', name = 'Not Authorized', loggable = false } = args || {};

    super(message);

    this.message = message;
    this.name = name;
    this.loggable = loggable;

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): SerializableError[] {
    return [{ message: this.message }];
  }
}

export { NotAuthorizedError, NotAuthorizedErrorArgs };
