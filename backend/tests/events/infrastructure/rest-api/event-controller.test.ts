import { getMockReq, getMockRes } from '@jest-mock/express';

import {
  CreateEventUseCase,
  EventController,
  GetEventsUseCase,
  GetEventUseCase,
  UpdateEventUseCase,
} from '../../../../src/events';
import { StatusCode } from '../../../../src/shared';
import { generateTestData } from '../../../utils';

describe('EventController', () => {
  let controller: EventController;
  let createEventUseCase: jest.Mocked<CreateEventUseCase>;
  let getEventsUseCase: jest.Mocked<GetEventsUseCase>;
  let getEventUseCase: jest.Mocked<GetEventUseCase>;
  let updateEventUseCase: jest.Mocked<UpdateEventUseCase>;

  beforeEach(() => {
    createEventUseCase = { run: jest.fn() } as unknown as jest.Mocked<CreateEventUseCase>;
    getEventsUseCase = { run: jest.fn() } as unknown as jest.Mocked<GetEventsUseCase>;
    getEventUseCase = { run: jest.fn() } as unknown as jest.Mocked<GetEventUseCase>;
    updateEventUseCase = { run: jest.fn() } as unknown as jest.Mocked<UpdateEventUseCase>;

    controller = new EventController(createEventUseCase, getEventsUseCase, getEventUseCase, updateEventUseCase);

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

  describe('getEvents', () => {
    it('should return the events data in the response', async () => {
      const eventsData = [generateTestData('event')];
      const req = getMockReq();
      const { res } = getMockRes();

      getEventsUseCase.run.mockResolvedValue(eventsData);

      await controller.getEvents(req, res);

      expect(getEventsUseCase.run).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith(eventsData);
    });

    it('should return an empty array in the response when there are no events', async () => {
      const req = getMockReq();
      const { res } = getMockRes();

      getEventsUseCase.run.mockResolvedValue([]);

      await controller.getEvents(req, res);

      expect(getEventsUseCase.run).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith([]);
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

  describe('updateEvent', () => {
    it('should have the event id in the request params', async () => {
      const id = '1';
      const req = getMockReq({ params: { id } });
      const { res } = getMockRes();

      await controller.updateEvent(req, res);

      expect(req.params.id).toBeDefined();
    });

    it('should have the event data in the request body', async () => {
      const eventData = generateTestData('event');
      const req = getMockReq({ body: eventData, params: { id: eventData.id.toString() } });
      const { res } = getMockRes();

      await controller.updateEvent(req, res);

      expect(req.body).toBeDefined();
    });

    it('should return the event data in the response when the event is updated', async () => {
      const eventData = generateTestData('event');
      const req = getMockReq({ params: { id: eventData.id.toString() }, body: eventData });
      const { res } = getMockRes();

      updateEventUseCase.run.mockResolvedValue(eventData);

      await controller.updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith(eventData);
    });

    it('should throw an error when the event id is not valid', async () => {
      const id = 'invalid';
      const req = getMockReq({ params: { id } });
      const { res } = getMockRes();

      await expect(controller.updateEvent(req, res)).rejects.toThrow();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should throw an error when the event update fails', async () => {
      const eventData = generateTestData('event');
      const req = getMockReq({ params: { id: eventData.id.toString() }, body: eventData });
      const { res } = getMockRes();

      updateEventUseCase.run.mockRejectedValue(new Error());

      await expect(controller.updateEvent(req, res)).rejects.toThrow();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
