import { Event, EventRepository } from '../domain';

class GetEventsUseCase {
  constructor(private eventRepository: EventRepository) {}

  async run(): Promise<Event[]> {
    const events = await this.eventRepository.getAll();

    return events;
  }
}

export { GetEventsUseCase };
