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
});
