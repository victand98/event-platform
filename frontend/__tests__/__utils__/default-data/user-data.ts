import { Role, User } from '@/modules';
import { faker } from '@faker-js/faker';

const defaultUserData: User = {
  createdAt: faker.date.recent(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  id: faker.number.int(),
  role: faker.helpers.enumValue(Role),
};

export { defaultUserData };
