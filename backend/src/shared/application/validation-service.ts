import { SerializableError, Validator } from '../domain';

interface ValidateResponse {
  errors: SerializableError[];
  hasErrors: boolean;
}

class ValidationService<T> {
  constructor(private readonly validator: Validator<T>) {}

  validate(value: T): ValidateResponse {
    const errors = this.validator.validate(value);

    return {
      errors,
      hasErrors: errors.length > 0,
    };
  }
}

export { ValidationService };
