import { z, ZodSchema } from 'zod';

import { ZodValidator } from '../../../../src/shared';

describe('ZodValidator', () => {
  let validator: ZodValidator<string>;
  let zodSchema: ZodSchema;

  beforeEach(() => {
    zodSchema = z.string().min(3);
    validator = new ZodValidator(zodSchema);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  describe('validate', () => {
    it('should return an empty array when the value is valid', () => {
      const value = 'valid value';

      const errors = validator.validate(value);

      expect(errors).toEqual([]);
    });

    it('should return an array with the error when the value is invalid', () => {
      const value = 'in';

      const errors = validator.validate(value);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toHaveProperty('message');
      expect(errors[0]).toHaveProperty('field');
    });

    it('should return an array with the error when the value is not as the expected type', () => {
      const value = 123 as unknown as string;

      const errors = validator.validate(value);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toHaveProperty('message');
      expect(errors[0]).toHaveProperty('field');
    });
  });
});
