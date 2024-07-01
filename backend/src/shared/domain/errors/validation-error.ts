import { StatusCode } from '../status-code';
import { CustomError, SerializableError } from './custom-error';

interface ValidationErrorArgs {
  errors: SerializableError[];
  message?: string;
  name?: string;
  loggable?: boolean;
}

class ValidationError extends CustomError {
  errors: SerializableError[];
  name: string;
  loggable: boolean;
  statusCode: number = StatusCode.BAD_REQUEST;

  constructor(args: ValidationErrorArgs) {
    const { errors, message = 'A validation error occurred', name = 'Validation Error', loggable = false } = args;

    super(message);

    this.errors = errors;
    this.message = message;
    this.name = name;
    this.loggable = loggable;

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors(): SerializableError[] {
    return this.errors;
  }
}

export { ValidationError };
