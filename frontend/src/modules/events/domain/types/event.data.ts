import { Event } from '../event';

type EventCreateData = Pick<
  Event,
  | 'comunity'
  | 'date'
  | 'description'
  | 'image'
  | 'location'
  | 'published'
  | 'title'
>;

export type { EventCreateData };
