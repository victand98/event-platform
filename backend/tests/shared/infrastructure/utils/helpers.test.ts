import { checkRequiredEnvVars } from '../../../../src/shared';

describe('helpers', () => {
  describe('checkRequiredEnvVars', () => {
    it('should throw an error when the required environment variable is missing', () => {
      const envVar = 'PORT';
      const env = { ...process.env };
      delete process.env[envVar];

      expect(() => checkRequiredEnvVars()).toThrow();
      process.env = env;
    });

    it('should not throw an error when the required environment variable is present', () => {
      const envVar = 'PORT';
      const env = { ...process.env };
      process.env[envVar] = '3000';

      expect(() => checkRequiredEnvVars()).not.toThrow();
      process.env = env;
    });
  });
});
