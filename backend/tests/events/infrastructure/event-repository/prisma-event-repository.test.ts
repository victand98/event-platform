import { prismaMock } from '../../../../prisma/singleton';
import { PrismaEventRepository } from '../../../../src/events';
import { generateTestData } from '../../../utils';

describe('PrismaEventRepository', () => {
  let repository: PrismaEventRepository;

  beforeEach(() => {
    repository = new PrismaEventRepository();

    jest.clearAllMocks();
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

  describe('getById', () => {
    it('should return a event when it receives an event id', async () => {
      const eventData = generateTestData('event');

      prismaMock.event.findUnique.mockResolvedValue(eventData);

      await expect(repository.getById(eventData.id)).resolves.toEqual(eventData);
      expect(prismaMock.event.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should return null when the event does not exist', async () => {
      prismaMock.event.findUnique.mockImplementation();

      await expect(repository.getById(1)).resolves.toBeUndefined();
      expect(prismaMock.event.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event retrieval fails', async () => {
      const eventData = generateTestData('event');

      prismaMock.event.findUnique.mockRejectedValue(new Error());

      await expect(repository.getById(eventData.id)).rejects.toThrow();
      expect(prismaMock.event.findUnique).toHaveBeenCalledTimes(1);
    });
  });
});
