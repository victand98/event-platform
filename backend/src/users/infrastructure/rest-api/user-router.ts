import { Router } from 'express';

import { validationMiddleware } from '../../../shared';
import { userController } from '../dependencies';
import { userSignInValidator, userSignUpValidator } from '../validators';

const userRouter = Router();

userRouter.post('/sign-up', validationMiddleware(userSignUpValidator), userController.signUp.bind(userController));
userRouter.post('/sign-in', validationMiddleware(userSignInValidator), userController.signIn.bind(userController));

export { userRouter };
