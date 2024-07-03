import { Request, Response } from 'express';

import { BadRequestError, StatusCode } from '../../../shared';
import { CreateEventUseCase, GetEventUseCase } from '../../application';

class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getEventUseCase: GetEventUseCase
  ) {}

  async createEvent(req: Request, res: Response) {
    const event = await this.createEventUseCase.run(req.body);
    res.status(StatusCode.CREATED).json(event);
  }

  async getEvent(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new BadRequestError({ message: 'Event id is not valid' });
    }

    const event = await this.getEventUseCase.run(id);
    res.status(StatusCode.OK).json(event);
  }
}

export { EventController };
