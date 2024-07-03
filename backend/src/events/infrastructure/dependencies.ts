import { CreateEventUseCase, GetEventUseCase } from '../application';
import { PrismaEventRepository } from './event-repository';
import { EventController } from './rest-api';

const eventRepository = new PrismaEventRepository();

const createEventUseCase = new CreateEventUseCase(eventRepository);
const getEventUseCase = new GetEventUseCase(eventRepository);

const eventController = new EventController(createEventUseCase, getEventUseCase);

export { eventController };
