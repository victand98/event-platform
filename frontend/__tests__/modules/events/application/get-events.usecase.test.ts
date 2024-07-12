import { EventRepository, getEventsUseCase } from '@/modules';
import { createMockEventRepository } from '../../../../__mocks__';
import { generateTestData } from '../../../../__utils__';

describe.only('getEventsUseCase', () => {
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();
  });

  it('should return a list of events when fetching is successful', async () => {
    const data = [generateTestData('event'), generateTestData('event')];
    eventRepository.getAll.mockResolvedValue(data);

    const getEvents = getEventsUseCase(eventRepository);
    const response = await getEvents();

    expect(response).toEqual(data);
    expect(eventRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when fetching fails', async () => {
    const error = new Error('Failed to fetch events');
    eventRepository.getAll.mockRejectedValue(error);

    const getEvents = getEventsUseCase(eventRepository);

    await expect(getEvents()).rejects.toThrow(error.message);
    expect(eventRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
