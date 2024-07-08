import { StatusCode } from './status-code';

interface SerializableError<T extends Record<string, any>> {
  message: string;
  field?: keyof T | 'root';
}

interface CustomError<T extends Record<string, any> = {}> {
  errors: SerializableError<T>[];
}

interface APIErrorArgs<T extends Record<string, any>> {
  errors: SerializableError<T>[];
  message?: string;
  statusCode?: StatusCode;
}

class APIError<T extends Record<string, any>> extends Error {
  errors: SerializableError<T>[];
  statusCode: StatusCode;

  constructor(args: APIErrorArgs<T>) {
    const {
      errors,
      message = 'An error occurred while processing the API request',
      statusCode = StatusCode.INTERNAL_SERVER_ERROR,
    } = args;

    super(message);

    this.errors = errors;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export { APIError };
export type { CustomError };
