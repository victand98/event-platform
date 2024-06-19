import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import prisma, { PrismaClient } from '.';

jest.mock('.', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
