import { Router } from 'express';

import { userController } from '../dependencies';

const userRouter = Router();

userRouter.post('/sign-up', userController.signUp.bind(userController));

export { userRouter };
