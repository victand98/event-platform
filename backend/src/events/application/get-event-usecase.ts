import { NotFoundError } from '../../shared';
import { Event, EventRepository } from '../domain';

class GetEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async run(id: number): Promise<Event> {
    const event = await this.eventRepository.getById(id);

    if (!event) {
      throw new NotFoundError({ message: 'Event not found' });
    }

    return event;
  }
}

export { GetEventUseCase };
