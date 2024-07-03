import { EventRepository, GetEventsUseCase } from '../../../src/events';
import { generateTestData } from '../../utils';
import { createMockEventRepository } from '../domain/__mocks__/mock-event-repository';

describe('GetEventsUseCase', () => {
  let useCase: GetEventsUseCase;
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();

    useCase = new GetEventsUseCase(eventRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should return a list of events when there are events', async () => {
      const eventData = [generateTestData('event'), generateTestData('event')];

      eventRepository.getAll.mockResolvedValue(eventData);

      expect(await useCase.run()).toEqual(eventData);

      expect(eventRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty list when there are no events', async () => {
      eventRepository.getAll.mockResolvedValue([]);

      expect(await useCase.run()).toEqual([]);

      expect(eventRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event retrieval fails', async () => {
      eventRepository.getAll.mockRejectedValue(new Error());

      await expect(useCase.run()).rejects.toThrow();

      expect(eventRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
