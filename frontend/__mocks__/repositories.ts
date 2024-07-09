import { UserRepository } from '@/modules';

const createMockUserRepository = (): jest.Mocked<UserRepository> => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
});

export { createMockUserRepository };
