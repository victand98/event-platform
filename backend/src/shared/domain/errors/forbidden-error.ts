import { StatusCode } from '../status-code';
import { CustomError, SerializableError } from './custom-error';

interface ForbiddenErrorArgs {
  message?: string;
  name?: string;
  loggable?: boolean;
}

class ForbiddenError extends CustomError {
  name: string;
  loggable: boolean;
  statusCode: number = StatusCode.FORBIDDEN;

  constructor(args?: ForbiddenErrorArgs) {
    const { message = 'Forbidden', name = 'Forbidden', loggable = false } = args || {};

    super(message);

    this.message = message;
    this.name = name;
    this.loggable = loggable;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors(): SerializableError[] {
    return [{ message: this.message }];
  }
}

export { ForbiddenError, ForbiddenErrorArgs };
