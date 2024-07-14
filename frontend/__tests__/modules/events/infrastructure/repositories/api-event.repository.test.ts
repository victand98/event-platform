import { APIError, apiEventRepository, EventCreateData } from '@/modules';
import fetchMock from 'jest-fetch-mock';
import { generateTestData } from '../../../../../__utils__';

describe('apiEventRepository', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('create', () => {
    it('should return an event when creation is successful', async () => {
      const data = generateTestData('event');
      const createData: EventCreateData = {
        comunity: data.comunity,
        date: data.date,
        description: data.description,
        image: data.image,
        location: data.location,
        published: data.published,
        title: data.title,
      };
      const response = data;
      fetchMock.mockResponseOnce(JSON.stringify(response));

      const create = apiEventRepository().create;
      const result = await create(createData);

      expect(JSON.stringify(result)).toEqual(JSON.stringify(response));
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an API error when creation fails', async () => {
      const data = generateTestData('event');
      const createData: EventCreateData = {
        comunity: data.comunity,
        date: data.date,
        description: data.description,
        image: data.image,
        location: data.location,
        published: data.published,
        title: data.title,
      };
      const apiError = generateTestData('apiError');
      const { errors, statusCode } = apiError;

      fetchMock.mockResponseOnce(JSON.stringify({ errors }), {
        status: statusCode,
      });

      const create = apiEventRepository().create;

      await expect(create(createData)).rejects.toThrow(APIError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when fetch fails', async () => {
      const data = generateTestData('event');
      const createData: EventCreateData = {
        comunity: data.comunity,
        date: data.date,
        description: data.description,
        image: data.image,
        location: data.location,
        published: data.published,
        title: data.title,
      };
      const error = new Error('Failed to fetch');
      fetchMock.mockRejectOnce(error);

      const create = apiEventRepository().create;

      await expect(create(createData)).rejects.toThrow(error.message);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('should return a list of events when fetching is successful', async () => {
      const data = [generateTestData('event'), generateTestData('event')];
      fetchMock.mockResponseOnce(JSON.stringify(data));

      const getAll = apiEventRepository().getAll;
      const result = await getAll();

      expect(JSON.stringify(result)).toEqual(JSON.stringify(data));
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an API error when fetching fails', async () => {
      const apiError = generateTestData('apiError');
      const { errors, statusCode } = apiError;

      fetchMock.mockResponseOnce(JSON.stringify({ errors }), {
        status: statusCode,
      });

      const getAll = apiEventRepository().getAll;

      await expect(getAll()).rejects.toThrow(APIError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when fetch fails', async () => {
      const error = new Error('Failed to fetch');
      fetchMock.mockRejectOnce(error);

      const getAll = apiEventRepository().getAll;

      await expect(getAll()).rejects.toThrow(error.message);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return an event when fetching is successful', async () => {
      const data = generateTestData('event');
      const id = data.id;
      fetchMock.mockResponseOnce(JSON.stringify(data));

      const getById = apiEventRepository().getById;
      const result = await getById(id);

      expect(JSON.stringify(result)).toEqual(JSON.stringify(data));
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an API error when fetching fails', async () => {
      const data = generateTestData('event');
      const id = data.id;
      const apiError = generateTestData('apiError');
      const { errors, statusCode } = apiError;

      fetchMock.mockResponseOnce(JSON.stringify({ errors }), {
        status: statusCode,
      });

      const getById = apiEventRepository().getById;

      await expect(getById(id)).rejects.toThrow(APIError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when fetch fails', async () => {
      const data = generateTestData('event');
      const id = data.id;
      const error = new Error('Failed to fetch');
      fetchMock.mockRejectOnce(error);

      const getById = apiEventRepository().getById;

      await expect(getById(id)).rejects.toThrow(error.message);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
