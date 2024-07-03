import { JsonWebTokenJwt } from '../../../../src/shared';

describe('JsonWebTokenJwt', () => {
  let jwt: JsonWebTokenJwt;
  process.env.JWT_SECRET = 'secret';

  beforeEach(() => {
    jwt = new JsonWebTokenJwt();
  });

  it('should be defined', () => {
    expect(jwt).toBeDefined();
  });

  describe('sign', () => {
    it('should return a string', () => {
      const payload = 'payload';
      const token = jwt.sign(payload);

      expect(typeof token).toBe('string');
    });

    it('should throw an error when the payload is invalid', () => {
      const payload = null as unknown as string;

      expect(() => jwt.sign(payload)).toThrow();
    });
  });

  describe('verify', () => {
    it('should return the payload', () => {
      const payload = 'payload';
      const token = jwt.sign(payload);
      const decoded = jwt.verify<string>(token);

      expect(decoded).toBe(payload);
    });

    it('should return null when the token is invalid', () => {
      const token = 'invalid-token';
      const decoded = jwt.verify<string>(token);

      expect(decoded).toBeNull();
    });
  });
});
