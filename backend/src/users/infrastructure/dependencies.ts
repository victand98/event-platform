import { ConsoleLogger, CryptoPasswordEncoder } from '../../shared';
import { SignInUseCase, SignUpUseCase } from '../application';
import { UserController } from './rest-api';
import { PrismaUserRepository } from './user-repository';

const userRepository = new PrismaUserRepository();
const logger = new ConsoleLogger();
const passwordEncoder = new CryptoPasswordEncoder();

const signUpUseCase = new SignUpUseCase(userRepository, logger, passwordEncoder);
const signInUseCase = new SignInUseCase(userRepository, passwordEncoder);

const userController = new UserController(signUpUseCase, signInUseCase);

export { userController };
