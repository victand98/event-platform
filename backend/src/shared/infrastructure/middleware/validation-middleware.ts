import { NextFunction, Request, Response } from 'express';

import { ValidationService } from '../../application';
import { ValidationError, Validator } from '../../domain';

const validationMiddleware = <T>(validator: Validator<T>) => {
  const validationService = new ValidationService(validator);

  return (req: Request, res: Response, next: NextFunction) => {
    const { hasErrors, errors } = validationService.validate(req.body);

    if (hasErrors) {
      throw new ValidationError({ errors });
    }

    next();
  };
};

export { validationMiddleware };
