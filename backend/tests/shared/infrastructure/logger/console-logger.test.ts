import { faker } from '@faker-js/faker';

import { ConsoleLogger, Message } from '../../../../src/shared';

describe('ConsoleLogger', () => {
  let logger: ConsoleLogger;

  beforeEach(() => {
    logger = new ConsoleLogger();

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  describe('info', () => {
    it('should log the message with the info level', () => {
      const message: Message = faker.lorem.sentence();

      jest.spyOn(console, 'log').mockImplementation();

      logger.info(message);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(message);
    });

    it('should log a message with context with the info level', () => {
      const message: Message = {
        message: faker.lorem.sentence(),
        context: { key: faker.lorem.word(), value: faker.lorem.word() },
      };

      jest.spyOn(console, 'log').mockImplementation();

      logger.info(message);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(message);
    });
  });

  describe('error', () => {
    it('should log the message with the error level', () => {
      const message: Message = faker.lorem.sentence();

      jest.spyOn(console, 'error').mockImplementation();

      logger.error(message);

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(message);
    });

    it('should log a message with context with the error level', () => {
      const message: Message = {
        message: faker.lorem.sentence(),
        context: { key: faker.lorem.word(), value: faker.lorem.word() },
      };

      jest.spyOn(console, 'error').mockImplementation();

      logger.error(message);

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(message);
    });
  });

  describe('warn', () => {
    it('should log the message with the warn level', () => {
      const message: Message = faker.lorem.sentence();

      jest.spyOn(console, 'warn').mockImplementation();

      logger.warn(message);

      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(message);
    });

    it('should log a message with context with the warn level', () => {
      const message: Message = {
        message: faker.lorem.sentence(),
        context: { key: faker.lorem.word(), value: faker.lorem.word() },
      };

      jest.spyOn(console, 'warn').mockImplementation();

      logger.warn(message);

      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(message);
    });
  });
});
