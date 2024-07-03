import { prismaMock } from '../../../../prisma/singleton';
import { PrismaEventRepository } from '../../../../src/events';
import { generateTestData } from '../../../utils';

describe('PrismaEventRepository', () => {
  let repository: PrismaEventRepository;

  beforeEach(() => {
    repository = new PrismaEventRepository();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it("should create a event when it receives an event's data", async () => {
      const eventData = generateTestData('event');

      prismaMock.event.create.mockResolvedValue(eventData);

      await expect(repository.create(eventData)).resolves.toEqual(eventData);
      expect(prismaMock.event.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event creation fails', async () => {
      const eventData = generateTestData('event');

      prismaMock.event.create.mockRejectedValue(new Error());

      await expect(repository.create(eventData)).rejects.toThrow();
      expect(prismaMock.event.create).toHaveBeenCalledTimes(1);
    });
  });
});
