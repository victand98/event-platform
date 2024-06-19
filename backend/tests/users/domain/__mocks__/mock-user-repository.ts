import { UserRepository } from '../../../../src/users';

const createMockUserRepository = (): jest.Mocked<UserRepository> => ({
  create: jest.fn(),
  getByEmail: jest.fn(),
});

export { createMockUserRepository };
