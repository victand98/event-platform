import { EventRepository, UserRepository } from '@/modules';

const createMockUserRepository = (): jest.Mocked<UserRepository> => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
});

const createMockEventRepository = (): jest.Mocked<EventRepository> => ({
  create: jest.fn(),
});

export { createMockEventRepository, createMockUserRepository };
