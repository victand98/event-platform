import { EventRepository, GetEventUseCase } from '../../../src/events';
import { generateTestData } from '../../utils';
import { createMockEventRepository } from '../domain/__mocks__/mock-event-repository';

describe('GetEventUseCase', () => {
  let useCase: GetEventUseCase;
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();

    useCase = new GetEventUseCase(eventRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should return the event when it exists', async () => {
      const eventData = generateTestData('event');

      eventRepository.getById.mockResolvedValue(eventData);

      expect(await useCase.run(eventData.id)).toEqual(eventData);

      expect(eventRepository.getById).toHaveBeenCalledWith(eventData.id);
      expect(eventRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event does not exist', async () => {
      eventRepository.getById.mockResolvedValue(null);

      await expect(useCase.run(1)).rejects.toThrow();

      expect(eventRepository.getById).toHaveBeenCalledWith(1);
      expect(eventRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event retrieval fails', async () => {
      const eventData = generateTestData('event');

      eventRepository.getById.mockRejectedValue(new Error());

      await expect(useCase.run(eventData.id)).rejects.toThrow();

      expect(eventRepository.getById).toHaveBeenCalledWith(eventData.id);
      expect(eventRepository.getById).toHaveBeenCalledTimes(1);
    });
  });
});
