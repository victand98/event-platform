import { Jwt } from '../../../../src/shared';

const createMockJwt = (): jest.Mocked<Jwt> => ({
  sign: jest.fn(),
  verify: jest.fn(),
});

export { createMockJwt };
