import { ConsoleLogger } from './logger';
import { ErrorMiddleware } from './middleware';
import { CryptoPasswordEncoder } from './password-encoder';

const logger = new ConsoleLogger();
const passwordEncoder = new CryptoPasswordEncoder();
const errorMiddleware = new ErrorMiddleware(logger);

export { errorMiddleware, logger, passwordEncoder };
