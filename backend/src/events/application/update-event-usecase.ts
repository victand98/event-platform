import { NotFoundError } from '../../shared';
import { Event, EventRepository } from '../domain';

class UpdateEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async run(id: number, data: Event): Promise<Event> {
    const event = await this.eventRepository.getById(id);

    if (!event) {
      throw new NotFoundError({ message: 'Event not found' });
    }

    return await this.eventRepository.update({ ...event, ...data });
  }
}

export { UpdateEventUseCase };
