import { faker } from '@faker-js/faker';

import { Role, User } from '../../../src/users';

const defaultUserData: User = {
  createdAt: new Date(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  id: faker.number.int(),
  role: faker.helpers.enumValue(Role),
};

export { defaultUserData };
