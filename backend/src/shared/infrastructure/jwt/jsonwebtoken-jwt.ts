import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { Jwt } from '../../domain';

class JsonWebTokenJwt implements Jwt {
  sign(payload: string | object | Buffer): string {
    return sign(payload, process.env.JWT_SECRET!);
  }

  verify(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_SECRET!);
  }
}

export { JsonWebTokenJwt };
