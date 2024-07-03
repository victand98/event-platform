import { Router } from 'express';

import { validationMiddleware } from '../../../shared';
import { eventController } from '../dependencies';
import { eventCreateValidator, eventUpdateValidator } from '../validators/event-zod-validator';

const eventRouter = Router();

eventRouter.post('/', validationMiddleware(eventCreateValidator), eventController.createEvent.bind(eventController));
eventRouter.get('/:id', eventController.getEvent.bind(eventController));
eventRouter.put('/:id', validationMiddleware(eventUpdateValidator), eventController.updateEvent.bind(eventController));

export { eventRouter };
