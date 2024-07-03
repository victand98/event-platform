import { z, ZodTypeAny } from 'zod';

import { ZodValidator } from '../../../shared';
import { Event } from '../../domain';

type EventCreateRawShape = Record<keyof Event, ZodTypeAny>;
const eventCreateSchema = z.object<EventCreateRawShape>({
  comunity: z.string().min(3),
  date: z.string().datetime(),
  description: z.string().min(3),
  location: z.string().min(3),
  title: z.string().min(3),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  published: z.boolean().optional(),
  id: z.number().optional(),
  image: z.string().nullable().optional(),
});
const eventCreateValidator = new ZodValidator(eventCreateSchema);

type EventUpdateRawShape = Partial<Record<keyof Event, ZodTypeAny>>;
const eventUpdateSchema = z.object<EventUpdateRawShape>({
  comunity: z.string().min(3).optional(),
  date: z.string().datetime().optional(),
  description: z.string().min(3).optional(),
  location: z.string().min(3).optional(),
  title: z.string().min(3).optional(),
  published: z.boolean().optional(),
  image: z.string().nullable().optional(),
});
const eventUpdateValidator = new ZodValidator(eventUpdateSchema);

export { eventCreateValidator, eventUpdateValidator };
