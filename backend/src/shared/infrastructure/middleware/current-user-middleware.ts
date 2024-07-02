import { NextFunction, Request, Response } from 'express';

import { Jwt } from '../../domain';

interface UserPayload {
  id: string;
  role: string;
}

declare module 'express' {
  interface Request {
    currentUser?: UserPayload;
  }
}

class CurrentUserMiddleware {
  constructor(private jwt: Jwt) {}

  handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const user = this.jwt.verify<UserPayload>(token);
      req.currentUser = user;
    }

    next();
  }
}

export { CurrentUserMiddleware };
