import { Request, Response } from 'express';

import { BadRequestError, StatusCode } from '../../../shared';
import { CreateEventUseCase, GetEventsUseCase, GetEventUseCase, UpdateEventUseCase } from '../../application';

class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getEventsUseCase: GetEventsUseCase,
    private readonly getEventUseCase: GetEventUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase
  ) {}

  async createEvent(req: Request, res: Response) {
    const event = await this.createEventUseCase.run(req.body);
    res.status(StatusCode.CREATED).json(event);
  }

  async getEvents(req: Request, res: Response) {
    const events = await this.getEventsUseCase.run();
    res.status(StatusCode.OK).json(events);
  }

  async getEvent(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new BadRequestError({ message: 'Event id is not valid' });
    }

    const event = await this.getEventUseCase.run(id);
    res.status(StatusCode.OK).json(event);
  }

  async updateEvent(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new BadRequestError({ message: 'Event id is not valid' });
    }

    const event = await this.updateEventUseCase.run(id, req.body);
    res.status(StatusCode.OK).json(event);
  }
}

export { EventController };
