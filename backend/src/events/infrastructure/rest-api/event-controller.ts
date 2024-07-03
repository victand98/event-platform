import { Request, Response } from 'express';

import { StatusCode } from '../../../shared';
import { CreateEventUseCase } from '../../application';

class EventController {
  constructor(private readonly createEventUseCase: CreateEventUseCase) {}

  async createEvent(req: Request, res: Response) {
    const event = await this.createEventUseCase.run(req.body);
    res.status(StatusCode.CREATED).json(event);
  }
}

export { EventController };
