import { Event } from '../event';

type EventCreateData = Pick<
  Event,
  'comunity' | 'description' | 'image' | 'location' | 'published' | 'title'
> & { date: Date | null };

export type { EventCreateData };
