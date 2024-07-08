import { APIError, User } from '@/modules';
import { defaultApiErrorData, defaultUserData } from './default-data';

type Entity = 'user' | 'apiError';

type DefaultData = {
  user: User;
  apiError: APIError<{ field: string }>;
};

const generateTestData = <T extends Entity>(
  type: T,
  overrides: Partial<DefaultData[T]> = {}
): DefaultData[T] => {
  const defaultData: DefaultData = {
    user: defaultUserData,
    apiError: defaultApiErrorData,
  };

  return { ...defaultData[type], ...overrides };
};

export { generateTestData };
