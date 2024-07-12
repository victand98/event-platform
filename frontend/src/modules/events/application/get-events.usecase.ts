import { Event, EventRepository } from '../domain';

const getEventsUseCase = (eventRepository: EventRepository) => {
  return async (): Promise<Event[]> => {
    return await eventRepository.getAll();
  };
};

export { getEventsUseCase };
