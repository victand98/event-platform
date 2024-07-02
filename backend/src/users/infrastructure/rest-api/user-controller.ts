import { Request, Response } from 'express';

import { StatusCode } from '../../../shared';
import { SignInUseCase, SignUpUseCase } from '../../application';

class UserController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase
  ) {}

  async signUp(req: Request, res: Response) {
    const user = await this.signUpUseCase.run(req.body);
    res.status(StatusCode.CREATED).json(user);
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.signInUseCase.run(email, password);
    res.status(StatusCode.OK).json(user);
  }
}

export { UserController };
