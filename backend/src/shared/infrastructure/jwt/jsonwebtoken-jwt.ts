import { sign, verify } from 'jsonwebtoken';

import { Jwt } from '../../domain';

class JsonWebTokenJwt implements Jwt {
  sign(payload: string | object | Buffer): string {
    return sign(payload, process.env.JWT_SECRET!);
  }

  verify<T>(token: string): T {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as T;
      return decoded;
    } catch (error) {
      return null as unknown as T;
    }
  }
}

export { JsonWebTokenJwt };
