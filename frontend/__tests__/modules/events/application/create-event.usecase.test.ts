import {
  createEventUseCase,
  EventCreateData,
  EventRepository,
} from '@/modules';
import { createMockEventRepository } from '../../../../__mocks__';
import { generateTestData } from '../../../../__utils__';

describe('createEventUseCase', () => {
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();
  });

  it('should return an event when creation is successful', async () => {
    const data = generateTestData('event');
    const eventData: EventCreateData = {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      comunity: data.comunity,
      image: data.image,
      location: data.location,
      published: data.published,
    };
    eventRepository.create.mockResolvedValue(data);

    const createEvent = createEventUseCase(eventRepository);
    const response = await createEvent(eventData);

    expect(response).toEqual(data);
    expect(eventRepository.create).toHaveBeenCalledTimes(1);
    expect(eventRepository.create).toHaveBeenCalledWith(eventData);
  });

  it('should throw an error when creation fails', async () => {
    const data = generateTestData('event');
    const eventData: EventCreateData = {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      comunity: data.comunity,
      image: data.image,
      location: data.location,
      published: data.published,
    };
    const error = new Error('Failed to create event');
    eventRepository.create.mockRejectedValue(error);

    const createEvent = createEventUseCase(eventRepository);

    await expect(createEvent(eventData)).rejects.toThrow(error.message);
    expect(eventRepository.create).toHaveBeenCalledTimes(1);
    expect(eventRepository.create).toHaveBeenCalledWith(eventData);
  });
});
