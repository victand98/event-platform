import { Event } from '../models';

interface EventRepository {
  create(event: Event): Promise<Event>;
  getById(id: number): Promise<Event | null>;
}

export { EventRepository };
