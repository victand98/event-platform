import 'express-async-errors';

import express, { Express } from 'express';

import { errorMiddleware } from './shared';
import { userRouter } from './users';

const app: Express = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(errorMiddleware.handle);

export { app };
