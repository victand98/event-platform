import { StatusCode } from '../status-code';
import { CustomError, SerializableError } from './custom-error';

interface BadRequestErrorArgs {
  message: string;
  field?: string;
  name?: string;
  loggable?: boolean;
}

class BadRequestError extends CustomError {
  name: string;
  loggable: boolean;
  statusCode: number = StatusCode.BAD_REQUEST;
  field?: string;

  constructor(args: BadRequestErrorArgs) {
    const { message, field, name = 'Bad Request', loggable = false } = args;

    super(message);

    this.name = name;
    this.loggable = loggable;
    this.field = field;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): SerializableError[] {
    return [{ message: this.message, field: this.field }];
  }
}

export { BadRequestError, BadRequestErrorArgs };
