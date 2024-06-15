import { ConsoleLogger } from '../../shared';
import { CryptoPasswordEncoder } from '../../shared/infrastructure/password-encoder';
import { SignUpUseCase } from '../application';
import { UserController } from './rest-api';
import { PrismaUserRepository } from './user-repository';

const userRepository = new PrismaUserRepository();
const logger = new ConsoleLogger();
const passwordEncoder = new CryptoPasswordEncoder();

const signUpUseCase = new SignUpUseCase(userRepository, logger, passwordEncoder);

const userController = new UserController(signUpUseCase);

export { userController };
