import { EventRepository } from '../../../../src/events';

const createMockEventRepository = (): jest.Mocked<EventRepository> => ({
  create: jest.fn(),
});

export { createMockEventRepository };
