import { APIError, Event, User } from '@/modules';
import {
  defaultApiErrorData,
  defaultEventData,
  defaultUserData,
} from './default-data';

type Entity = 'user' | 'apiError' | 'event';

type DefaultData = {
  user: User;
  event: Event;
  apiError: APIError<{ field: string }>;
};

const generateTestData = <T extends Entity>(
  type: T,
  overrides: Partial<DefaultData[T]> = {}
): DefaultData[T] => {
  const defaultData: DefaultData = {
    user: defaultUserData,
    event: defaultEventData,
    apiError: defaultApiErrorData,
  };

  return { ...defaultData[type], ...overrides };
};

export { generateTestData };
