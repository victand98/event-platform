import { Event } from '../models';

interface EventRepository {
  create(event: Event): Promise<Event>;
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event | null>;
  update(event: Event): Promise<Event>;
}

export { EventRepository };
