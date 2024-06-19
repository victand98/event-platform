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
    it('should validate the given value when it is valid', () => {
      const value = 'valid value';

      expect(() => validator.validate(value)).not.toThrow();
    });

    it('should throw an error when the value is invalid', () => {
      const value = 'in';

      expect(() => validator.validate(value)).toThrow();
    });

    it('should throw an error when the value is not as the expected type', () => {
      const value = 123 as unknown as string;

      expect(() => validator.validate(value)).toThrow();
    });
  });
});
