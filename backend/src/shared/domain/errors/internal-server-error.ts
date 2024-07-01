import { StatusCode } from '../status-code';
import { CustomError, SerializableError } from './custom-error';

interface InternalServerErrorArgs {
  message?: string;
  name?: string;
  loggable?: boolean;
}

class InternalServerError extends CustomError {
  name: string;
  loggable: boolean;
  statusCode: number = StatusCode.INTERNAL_SERVER_ERROR;

  constructor(args?: InternalServerErrorArgs) {
    const { message = 'Internal Server Error', name = 'Internal Server Error', loggable = false } = args || {};

    super(message);

    this.message = message;
    this.name = name;
    this.loggable = loggable;

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors(): SerializableError[] {
    return [{ message: this.message }];
  }
}

export { InternalServerError, InternalServerErrorArgs };
