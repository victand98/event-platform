import { Validator } from '../domain';

class ValidationService<T> {
  constructor(private readonly validator: Validator<T>) {}

  validate(value: T): void {
    this.validator.validate(value);
  }
}

export { ValidationService };
