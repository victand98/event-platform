import { ZodSchema } from 'zod';

import { SerializableError, Validator } from '../../domain';

class ZodValidator<T> implements Validator<T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  validate(value: T): SerializableError[] {
    const { success, error } = this.schema.safeParse(value);

    if (success) {
      return [];
    }
    return error.errors.map((error) => {
      return { message: error.message, field: error.path.join('.') };
    });
  }
}

export { ZodValidator };
