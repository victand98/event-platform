import { CreateEventUseCase, GetEventsUseCase, GetEventUseCase, UpdateEventUseCase } from '../application';
import { PrismaEventRepository } from './event-repository';
import { EventController } from './rest-api';

const eventRepository = new PrismaEventRepository();

const createEventUseCase = new CreateEventUseCase(eventRepository);
const getEventsUseCase = new GetEventsUseCase(eventRepository);
const getEventUseCase = new GetEventUseCase(eventRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository);

const eventController = new EventController(createEventUseCase, getEventsUseCase, getEventUseCase, updateEventUseCase);

export { eventController };
