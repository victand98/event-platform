import 'express-async-errors';

import cors from 'cors';
import express, { Express } from 'express';

import { eventRouter } from './events';
import { currentUserMiddleware, errorMiddleware } from './shared';
import { userRouter } from './users';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(currentUserMiddleware.handle.bind(currentUserMiddleware));

app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

app.use(errorMiddleware.handle.bind(errorMiddleware));

export { app };
