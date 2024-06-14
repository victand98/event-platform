import { Logger, Message } from '../../domain';

class ConsoleLogger implements Logger {
  info(message: Message): void {
    console.log(message);
  }
  error(message: Message): void {
    console.error(message);
  }
  warn(message: Message): void {
    console.warn(message);
  }
}

export { ConsoleLogger };
