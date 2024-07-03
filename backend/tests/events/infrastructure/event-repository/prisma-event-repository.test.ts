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

  describe('getAll', () => {
    it('should return a list of events', async () => {
      const eventData = [generateTestData('event'), generateTestData('event')];

      prismaMock.event.findMany.mockResolvedValue(eventData);

      await expect(repository.getAll()).resolves.toEqual(eventData);
      expect(prismaMock.event.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty list when there are no events', async () => {
      prismaMock.event.findMany.mockResolvedValue([]);

      await expect(repository.getAll()).resolves.toEqual([]);
      expect(prismaMock.event.findMany).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event retrieval fails', async () => {
      prismaMock.event.findMany.mockRejectedValue(new Error());

      await expect(repository.getAll()).rejects.toThrow();
      expect(prismaMock.event.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return an event when it receives an event id', async () => {
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

  describe('update', () => {
    it('should update an event when it receives an event id and data', async () => {
      const eventData = generateTestData('event');

      prismaMock.event.update.mockResolvedValue(eventData);

      await expect(repository.update(eventData)).resolves.toEqual(eventData);
      expect(prismaMock.event.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event update fails', async () => {
      const eventData = generateTestData('event');

      prismaMock.event.update.mockRejectedValue(new Error());

      await expect(repository.update(eventData)).rejects.toThrow();
      expect(prismaMock.event.update).toHaveBeenCalledTimes(1);
    });
  });
});
