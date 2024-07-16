import { Event, EventRepository } from '../domain';

const getEventsUseCase = (eventRepository: EventRepository) => {
  return async (onlyPublished: boolean = false): Promise<Event[]> => {
    const events = await eventRepository.getAll();
    if (onlyPublished) {
      return events.filter((event) => event.published);
    }
    return events;
  };
};

export { getEventsUseCase };
