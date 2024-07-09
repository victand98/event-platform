import { APIError, StatusCode } from '@/modules';
import { faker } from '@faker-js/faker';

const defaultApiErrorData: APIError<{ field: string }> = new APIError({
  errors: [{ message: faker.lorem.sentence(), field: 'field' }],
  message: faker.lorem.sentence(),
  statusCode: StatusCode.BAD_REQUEST,
});

export { defaultApiErrorData };
