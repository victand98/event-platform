import { Router } from 'express';

import { authenticationMiddleware, validationMiddleware } from '../../../shared';
import { eventController } from '../dependencies';
import { eventCreateValidator, eventUpdateValidator } from '../validators';

const eventRouter = Router();

eventRouter.post(
  '/',
  authenticationMiddleware.handle,
  validationMiddleware(eventCreateValidator),
  eventController.createEvent.bind(eventController)
);
eventRouter.get('/', eventController.getEvents.bind(eventController));
eventRouter.get('/:id', eventController.getEvent.bind(eventController));
eventRouter.put(
  '/:id',
  authenticationMiddleware.handle,
  validationMiddleware(eventUpdateValidator),
  eventController.updateEvent.bind(eventController)
);

export { eventRouter };
