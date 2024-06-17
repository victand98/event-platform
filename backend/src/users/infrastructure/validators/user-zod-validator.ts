import { z, ZodTypeAny } from 'zod';

import { ZodValidator } from '../../../shared';
import { User } from '../../domain';

type UserSignUpRawShape = Record<keyof Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>, ZodTypeAny>;

const userSignUpSchema = z.object<UserSignUpRawShape>({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const userSignUpValidator = new ZodValidator(userSignUpSchema);

export { userSignUpValidator };
