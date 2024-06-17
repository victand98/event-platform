import { NextFunction, Request, Response } from 'express';

import { ValidationService } from '../../application';
import { Validator } from '../../domain';

const validationMiddleware = <T>(validator: Validator<T>) => {
  const validationService = new ValidationService(validator);

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validationService.validate(req.body);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

export { validationMiddleware };
