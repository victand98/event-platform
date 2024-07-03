import { Event } from '../models';

interface EventRepository {
  create(event: Event): Promise<Event>;
}

export { EventRepository };
