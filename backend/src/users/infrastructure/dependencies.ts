import { jwt, logger, passwordEncoder } from '../../shared';
import { SignInUseCase, SignUpUseCase } from '../application';
import { UserController } from './rest-api';
import { PrismaUserRepository } from './user-repository';

const userRepository = new PrismaUserRepository();

const signUpUseCase = new SignUpUseCase(userRepository, logger, passwordEncoder);
const signInUseCase = new SignInUseCase(userRepository, passwordEncoder, jwt);

const userController = new UserController(signUpUseCase, signInUseCase);

export { userController };
