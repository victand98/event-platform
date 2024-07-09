import { Event } from './event';
import { EventCreateData } from './types';

interface EventRepository {
  create(data: EventCreateData): Promise<Event>;
}

export type { EventRepository };
