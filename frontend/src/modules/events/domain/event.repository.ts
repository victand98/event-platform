import { Event } from './event';
import { EventCreateData, EventUpdateData } from './types';

interface EventRepository {
  create(data: EventCreateData): Promise<Event>;
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event>;
  update(id: number, data: EventUpdateData): Promise<Event>;
}

export type { EventRepository };
