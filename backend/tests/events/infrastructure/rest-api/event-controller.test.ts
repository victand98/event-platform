import { getMockReq, getMockRes } from '@jest-mock/express';

import { CreateEventUseCase, EventController } from '../../../../src/events';
import { StatusCode } from '../../../../src/shared';
import { generateTestData } from '../../../utils';

describe('EventController', () => {
  let controller: EventController;
  let createEventUseCase: jest.Mocked<CreateEventUseCase>;

  beforeEach(() => {
    createEventUseCase = {
      run: jest.fn(),
    } as unknown as jest.Mocked<CreateEventUseCase>;
    controller = new EventController(createEventUseCase);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEvent', () => {
    it('should have the event data in the request body', async () => {
      const eventData = generateTestData('event');
      const req = getMockReq({ body: eventData });
      const { res } = getMockRes();

      await controller.createEvent(req, res);

      expect(req.body).toBeDefined();
    });

    it('should return the event data in the response when the event is created', async () => {
      const eventData = generateTestData('event');
      const req = getMockReq({ body: eventData });
      const { res } = getMockRes();

      createEventUseCase.run.mockResolvedValue(eventData);

      await controller.createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
      expect(res.json).toHaveBeenCalledWith(eventData);
    });

    it('should throw an error when the event creation fails', async () => {
      const eventData = generateTestData('event');
      const req = getMockReq({ body: eventData });
      const { res } = getMockRes();

      createEventUseCase.run.mockRejectedValue(new Error());

      await expect(controller.createEvent(req, res)).rejects.toThrow();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
