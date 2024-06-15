import { Request, Response } from 'express';

import { StatusCode } from '../../../shared';
import { SignUpUseCase } from '../../application';

class UserController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async signUp(req: Request, res: Response) {
    const user = await this.signUpUseCase.run(req.body);
    res.status(StatusCode.CREATED).json(user);
  }
}

export { UserController };
