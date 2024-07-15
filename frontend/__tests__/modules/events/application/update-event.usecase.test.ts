import {
  EventRepository,
  EventUpdateData,
  updateEventUseCase,
} from '@/modules';
import { createMockEventRepository } from '../../../../__mocks__';
import { generateTestData } from '../../../../__utils__';

describe('updateEventUseCase', () => {
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();
  });

  it('should return an event when update is successful', async () => {
    const data = generateTestData('event');
    const eventData: EventUpdateData = {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      comunity: data.comunity,
      image: data.image,
      location: data.location,
      published: data.published,
    };
    eventRepository.update.mockResolvedValue(data);

    const updateEvent = updateEventUseCase(eventRepository);
    const response = await updateEvent(data.id, eventData);

    expect(response).toEqual(data);
    expect(eventRepository.update).toHaveBeenCalledTimes(1);
    expect(eventRepository.update).toHaveBeenCalledWith(data.id, eventData);
  });

  it('should throw an error when update fails', async () => {
    const data = generateTestData('event');
    const eventData: EventUpdateData = {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      comunity: data.comunity,
      image: data.image,
      location: data.location,
      published: data.published,
    };
    const error = new Error('Failed to update event');
    eventRepository.update.mockRejectedValue(error);

    const updateEvent = updateEventUseCase(eventRepository);

    await expect(updateEvent(data.id, eventData)).rejects.toThrow(
      error.message
    );
    expect(eventRepository.update).toHaveBeenCalledTimes(1);
    expect(eventRepository.update).toHaveBeenCalledWith(data.id, eventData);
  });
});
