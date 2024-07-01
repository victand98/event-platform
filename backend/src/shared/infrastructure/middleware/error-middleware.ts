import { NextFunction, Request, Response } from 'express';

import { CustomError, Logger, StatusCode } from '../../domain';

class ErrorMiddleware {
  constructor(private logger: Logger) {}

  handle(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof CustomError) {
      if (error.loggable) {
        this.logger.error({
          context: {
            message: error.message,
            name: error.name,
            stack: error.stack,
          },
          message: error.message,
        });
      }
      res.status(error.statusCode).json({ errors: error.serializeErrors() });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ errors: [{ message: 'Something went wrong' }] });
    }
    next();
  }
}

export { ErrorMiddleware };
