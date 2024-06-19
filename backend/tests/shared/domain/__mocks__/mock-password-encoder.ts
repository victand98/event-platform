import { PasswordEncoder } from '../../../../src/shared';

const createMockPasswordEncoder = (): jest.Mocked<PasswordEncoder> => ({
  encode: jest.fn(),
  compare: jest.fn(),
});

export { createMockPasswordEncoder };
