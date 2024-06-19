import { Event } from '../../src/events';
import { User } from '../../src/users';
import { defaultEventData, defaultUserData } from './default-data';

type Entity = 'user' | 'event';

type DefaultData = {
  user: User;
  event: Event;
};

const generateTestData = <T extends Entity>(type: T, overrides: Partial<DefaultData[T]> = {}): DefaultData[T] => {
  const defaultData: DefaultData = {
    user: defaultUserData,
    event: defaultEventData,
  };

  return { ...defaultData[type], ...overrides };
};

export { generateTestData };
