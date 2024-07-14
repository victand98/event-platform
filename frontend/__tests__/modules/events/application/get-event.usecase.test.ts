import { EventRepository, getEventUseCase } from '@/modules';
import { createMockEventRepository } from '../../../../__mocks__';
import { generateTestData } from '../../../../__utils__';

describe('getEventUseCase', () => {
  let eventRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepository = createMockEventRepository();
  });

  it('should return an event when fetching is successful', async () => {
    const data = generateTestData('event');
    const id = data.id;
    eventRepository.getById.mockResolvedValue(data);

    const getEvent = getEventUseCase(eventRepository);
    const response = await getEvent(id);

    expect(response).toEqual(data);
    expect(eventRepository.getById).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when fetching fails', async () => {
    const error = new Error('Failed to fetch event');
    eventRepository.getById.mockRejectedValue(error);

    const getEvent = getEventUseCase(eventRepository);

    await expect(getEvent(1)).rejects.toThrow(error.message);
    expect(eventRepository.getById).toHaveBeenCalledTimes(1);
  });
});
