import { EventRepository, UpdateEventUseCase } from '../../../src/events';
import { generateTestData } from '../../utils';
import { createMockEventRepository } from '../domain/__mocks__/mock-event-repository';

describe('UpdateEventUseCase', () => {
  let useCase: UpdateEventUseCase;
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();

    useCase = new UpdateEventUseCase(eventRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should return an event when it has been updated', async () => {
      const eventData = generateTestData('event');
      const updatedEventData = { ...eventData, title: 'Updated title' };

      eventRepository.getById.mockResolvedValue(eventData);
      eventRepository.update.mockResolvedValue(updatedEventData);

      expect(await useCase.run(eventData.id, updatedEventData)).toEqual(updatedEventData);

      expect(eventRepository.getById).toHaveBeenCalledWith(eventData.id);
      expect(eventRepository.getById).toHaveBeenCalledTimes(1);
      expect(eventRepository.update).toHaveBeenCalledWith(updatedEventData);
      expect(eventRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the event does not exist', async () => {
      eventRepository.getById.mockResolvedValue(null);

      await expect(useCase.run(1, generateTestData('event'))).rejects.toThrow();

      expect(eventRepository.getById).toHaveBeenCalledWith(1);
      expect(eventRepository.getById).toHaveBeenCalledTimes(1);
      expect(eventRepository.update).not.toHaveBeenCalled();
    });

    it('should throw an error when the event update fails', async () => {
      const eventData = generateTestData('event');
      const updatedEventData = { ...eventData, title: 'Updated title' };

      eventRepository.getById.mockResolvedValue(eventData);
      eventRepository.update.mockRejectedValue(new Error());

      await expect(useCase.run(eventData.id, updatedEventData)).rejects.toThrow();

      expect(eventRepository.getById).toHaveBeenCalledWith(eventData.id);
      expect(eventRepository.getById).toHaveBeenCalledTimes(1);
      expect(eventRepository.update).toHaveBeenCalledWith(updatedEventData);
      expect(eventRepository.update).toHaveBeenCalledTimes(1);
    });
  });
});
