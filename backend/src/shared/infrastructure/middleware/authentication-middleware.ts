import { NextFunction, Request, Response } from 'express';

import { NotAuthorizedError } from '../../domain';

class AuthenticationMiddleware {
  handle(req: Request, res: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }

    next();
  }
}

export { AuthenticationMiddleware };
