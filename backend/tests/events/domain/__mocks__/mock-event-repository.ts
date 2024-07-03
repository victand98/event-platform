import { EventRepository } from '../../../../src/events';

const createMockEventRepository = (): jest.Mocked<EventRepository> => ({
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
});

export { createMockEventRepository };
