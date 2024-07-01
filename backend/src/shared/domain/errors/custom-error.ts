interface SerializableError {
  message: string;
  field?: string;
}

abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly name: string;
  abstract readonly loggable: boolean;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): SerializableError[];
}

export { CustomError, SerializableError };
