import { CreateEventUseCase, EventRepository } from '../../../src/events';
import { generateTestData } from '../../utils';
import { createMockEventRepository } from '../domain/__mocks__/mock-event-repository';

describe('CreateEventUseCase', () => {
  let createEventUseCase: CreateEventUseCase;
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();

    createEventUseCase = new CreateEventUseCase(eventRepository);

    jest.clearAllMocks();
  });

  describe('run', () => {
    it('should return the event when the event is created', async () => {
      const eventData = generateTestData('event');

      eventRepository.create.mockResolvedValue(eventData);

      expect(await createEventUseCase.run(eventData)).toEqual(eventData);

      expect(eventRepository.create).toHaveBeenCalledWith(eventData);
      expect(eventRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event creation fails', async () => {
      const eventData = generateTestData('event');

      eventRepository.create.mockRejectedValue(new Error());

      await expect(createEventUseCase.run(eventData)).rejects.toThrow();

      expect(eventRepository.create).toHaveBeenCalledWith(eventData);
      expect(eventRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
