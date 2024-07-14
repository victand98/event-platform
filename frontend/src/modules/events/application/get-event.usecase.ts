import { Event, EventRepository } from '../domain';

const getEventUseCase = (eventRepository: EventRepository) => {
  return async (id: number): Promise<Event> => {
    return await eventRepository.getById(id);
  };
};

export { getEventUseCase };
