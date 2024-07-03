import { CreateEventUseCase } from '../application';
import { PrismaEventRepository } from './event-repository';
import { EventController } from './rest-api';

const eventRepository = new PrismaEventRepository();

const createEventUseCase = new CreateEventUseCase(eventRepository);

const eventController = new EventController(createEventUseCase);

export { eventController };
