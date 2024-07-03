import { Event, EventRepository } from '../domain';

class CreateEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async run(data: Event): Promise<Event> {
    const event = await this.eventRepository.create(data);
    return event;
  }
}

export { CreateEventUseCase };
