import { faker } from '@faker-js/faker';

import { prismaMock } from '../../../../prisma/singleton';
import { PrismaUserRepository } from '../../../../src/users';
import { generateTestData } from '../../../utils';

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;

  beforeEach(() => {
    repository = new PrismaUserRepository();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it("should create a user when it receives a user's data", async () => {
      const userData = generateTestData('user');

      prismaMock.user.create.mockResolvedValue(userData);

      await expect(repository.create(userData)).resolves.toEqual(userData);
    });

    it('should throw an error when the user creation fails', async () => {
      const userData = generateTestData('user');

      prismaMock.user.create.mockRejectedValue(new Error());

      await expect(repository.create(userData)).rejects.toThrow();
    });
  });

  describe('getByEmail', () => {
    it('should return a user when it receives an email', async () => {
      const userData = generateTestData('user');

      prismaMock.user.findUnique.mockResolvedValue(userData);

      await expect(repository.getByEmail(userData.email)).resolves.toEqual(userData);
    });

    it('should return null when the user does not exist', async () => {
      prismaMock.user.findUnique.mockImplementation();

      await expect(repository.getByEmail(faker.internet.email())).resolves.toBeUndefined();
    });
  });
});
