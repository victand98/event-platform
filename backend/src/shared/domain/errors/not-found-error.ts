import { StatusCode } from '../status-code';
import { CustomError, SerializableError } from './custom-error';

interface NotFoundErrorArgs {
  message?: string;
  name?: string;
  loggable?: boolean;
}

class NotFoundError extends CustomError {
  name: string;
  loggable: boolean;
  statusCode: number = StatusCode.NOT_FOUND;

  constructor(args?: NotFoundErrorArgs) {
    const { message = 'The requested resource was not found', name = 'Not Found', loggable = false } = args || {};
    super(message);

    this.message = message;
    this.name = name;
    this.loggable = loggable;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): SerializableError[] {
    return [{ message: this.message }];
  }
}

export { NotFoundError, NotFoundErrorArgs };
