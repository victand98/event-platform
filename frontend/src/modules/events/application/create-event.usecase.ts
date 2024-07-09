import { Event, EventCreateData, EventRepository } from '../domain';

const createEventUseCase = (eventRepository: EventRepository) => {
  return async (data: EventCreateData): Promise<Event> => {
    return await eventRepository.create(data);
  };
};

export { createEventUseCase };
