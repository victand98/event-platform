import { Event } from './event';
import { EventCreateData } from './types';

interface EventRepository {
  create(data: EventCreateData): Promise<Event>;
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event>;
}

export type { EventRepository };
