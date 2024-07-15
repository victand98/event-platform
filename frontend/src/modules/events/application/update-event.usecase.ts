import { Event, EventCreateData, EventRepository } from '../domain';

const updateEventUseCase = (eventRepository: EventRepository) => {
  return async (id: number, data: EventCreateData): Promise<Event> => {
    return await eventRepository.update(id, data);
  };
};

export { updateEventUseCase };
