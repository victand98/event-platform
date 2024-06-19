import { faker } from '@faker-js/faker';

import { CryptoPasswordEncoder } from '../../../../src/shared';

describe('CryptoPasswordEncoder', () => {
  let passwordEncoder: CryptoPasswordEncoder;

  beforeEach(() => {
    passwordEncoder = new CryptoPasswordEncoder();
  });

  it('should be defined', () => {
    expect(passwordEncoder).toBeDefined();
  });

  describe('encode', () => {
    it('should return an encoded password when a password is given', async () => {
      const password = faker.internet.password();

      const encodedPassword = await passwordEncoder.encode(password);

      expect(encodedPassword).toBeDefined();
      expect(encodedPassword).toContain('.');
      expect(encodedPassword).not.toEqual(password);
    });

    it('should return an encoded password when the same password is given', async () => {
      const password = faker.internet.password();

      const encodedPassword1 = await passwordEncoder.encode(password);
      const encodedPassword2 = await passwordEncoder.encode(password);

      expect(encodedPassword1).toBeDefined();
      expect(encodedPassword2).toBeDefined();
      expect(encodedPassword1).not.toEqual(encodedPassword2);
    });

    it('should return an encoded password when a empty password is given', async () => {
      const password = '';

      const encodedPassword = await passwordEncoder.encode(password);

      expect(encodedPassword).toBeDefined();
      expect(encodedPassword).toContain('.');
      expect(encodedPassword).not.toEqual(password);
    });

    it('should throw an error when a non-string password is given', async () => {
      const password = 123 as unknown as string;

      await expect(passwordEncoder.encode(password)).rejects.toThrow();
    });

    it('should throw an error when a null password is given', async () => {
      const password = null as unknown as string;

      await expect(passwordEncoder.encode(password)).rejects.toThrow();
    });
  });

  describe('compare', () => {
    it('should return true when the password and the encoded password are the same', async () => {
      const password = faker.internet.password();

      const encodedPassword = await passwordEncoder.encode(password);

      const result = await passwordEncoder.compare(password, encodedPassword);

      expect(result).toBe(true);
    });

    it('should return false when the password and the encoded password are different', async () => {
      const password = faker.internet.password();
      const otherPassword = faker.internet.password();

      const encodedPassword = await passwordEncoder.encode(password);

      const result = await passwordEncoder.compare(otherPassword, encodedPassword);

      expect(result).toBe(false);
    });

    it('should throw an error when a non-string password is given', async () => {
      const password = 123 as unknown as string;
      const encodedPassword = faker.internet.password();

      await expect(passwordEncoder.compare(password, encodedPassword)).rejects.toThrow();
    });

    it('should throw an error when a null password is given', async () => {
      const password = null as unknown as string;
      const encodedPassword = faker.internet.password();

      await expect(passwordEncoder.compare(password, encodedPassword)).rejects.toThrow();
    });
  });
});
