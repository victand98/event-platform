import { Logger } from '../../../../src/shared';

const createMockLogger = (): jest.Mocked<Logger> => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
});

export { createMockLogger };
