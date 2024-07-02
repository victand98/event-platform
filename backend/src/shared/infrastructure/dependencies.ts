import { JsonWebTokenJwt } from './jwt';
import { ConsoleLogger } from './logger';
import { ErrorMiddleware } from './middleware';
import { CryptoPasswordEncoder } from './password-encoder';

const logger = new ConsoleLogger();
const passwordEncoder = new CryptoPasswordEncoder();
const errorMiddleware = new ErrorMiddleware(logger);
const jwt = new JsonWebTokenJwt();

export { errorMiddleware, jwt, logger, passwordEncoder };
