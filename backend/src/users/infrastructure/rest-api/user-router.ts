import { Router } from 'express';

import { validationMiddleware } from '../../../shared';
import { userController } from '../dependencies';
import { userSignUpValidator } from '../validators';

const userRouter = Router();

userRouter.post('/sign-up', validationMiddleware(userSignUpValidator), userController.signUp.bind(userController));

export { userRouter };
