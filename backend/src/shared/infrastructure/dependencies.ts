import { JsonWebTokenJwt } from './jwt';
import { ConsoleLogger } from './logger';
import { AuthenticationMiddleware, CurrentUserMiddleware, ErrorMiddleware } from './middleware';
import { CryptoPasswordEncoder } from './password-encoder';

const logger = new ConsoleLogger();
const jwt = new JsonWebTokenJwt();
const passwordEncoder = new CryptoPasswordEncoder();

const errorMiddleware = new ErrorMiddleware(logger);
const currentUserMiddleware = new CurrentUserMiddleware(jwt);
const authenticationMiddleware = new AuthenticationMiddleware();

export { authenticationMiddleware, currentUserMiddleware, errorMiddleware, jwt, logger, passwordEncoder };
