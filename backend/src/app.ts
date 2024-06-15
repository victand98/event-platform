import express, { Express } from 'express';

import { userRouter } from './users';

const app: Express = express();

app.use(express.json());

app.use('/users', userRouter);

export { app };
