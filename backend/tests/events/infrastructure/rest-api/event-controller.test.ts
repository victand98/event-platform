import { getMockReq, getMockRes } from '@jest-mock/express';

import { CreateEventUseCase, EventController, GetEventUseCase } from '../../../../src/events';
import { StatusCode } from '../../../../src/shared';
import { generateTestData } from '../../../utils';

describe('EventController', () => {
  let controller: EventController;
  let createEventUseCase: jest.Mocked<CreateEventUseCase>;
  let getEventUseCase: jest.Mocked<GetEventUseCase>;

  beforeEach(() => {
    createEventUseCase = {
      run: jest.fn(),
    } as unknown as jest.Mocked<CreateEventUseCase>;
    getEventUseCase = {
      run: jest.fn(),
    } as unknown as jest.Mocked<GetEventUseCase>;
    controller = new EventController(createEventUseCase, getEventUseCase);

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

  describe('getEvent', () => {
    it('should have the event id in the request params', async () => {
      const id = '1';
      const req = getMockReq({ params: { id } });
      const { res } = getMockRes();

      await controller.getEvent(req, res);

      expect(req.params.id).toBeDefined();
    });

    it('should return the event data in the response when the event is found', async () => {
      const eventData = generateTestData('event');
      const req = getMockReq({ params: { id: eventData.id.toString() } });
      const { res } = getMockRes();

      getEventUseCase.run.mockResolvedValue(eventData);

      await controller.getEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith(eventData);
    });

    it('should throw an error when the event id is not valid', async () => {
      const id = 'invalid';
      const req = getMockReq({ params: { id } });
      const { res } = getMockRes();

      await expect(controller.getEvent(req, res)).rejects.toThrow();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should throw an error when the event is not found', async () => {
      const id = '1';
      const req = getMockReq({ params: { id } });
      const { res } = getMockRes();

      getEventUseCase.run.mockRejectedValue(new Error());

      await expect(controller.getEvent(req, res)).rejects.toThrow();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
