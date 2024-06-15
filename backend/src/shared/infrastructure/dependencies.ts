import { ConsoleLogger } from './logger';
import { CryptoPasswordEncoder } from './password-encoder';

const logger = new ConsoleLogger();
const passwordEncoder = new CryptoPasswordEncoder();

export { logger, passwordEncoder };
