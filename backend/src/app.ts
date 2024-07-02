import 'express-async-errors';

import express, { Express } from 'express';

import { currentUserMiddleware, errorMiddleware } from './shared';
import { userRouter } from './users';

const app: Express = express();

app.use(express.json());

app.use(currentUserMiddleware.handle.bind(currentUserMiddleware));

app.use('/users', userRouter);

app.use(errorMiddleware.handle.bind(errorMiddleware));

export { app };
