import { ZodSchema } from 'zod';

import { Validator } from '../../domain';

class ZodValidator<T> implements Validator<T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  validate(value: T): void {
    this.schema.parse(value);
  }
}

export { ZodValidator };
