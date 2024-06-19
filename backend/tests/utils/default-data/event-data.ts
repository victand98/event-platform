import { faker } from '@faker-js/faker';

import { Event } from '../../../src/events';

const defaultEventData: Event = {
  createdAt: new Date(),
  comunity: faker.company.name(),
  description: faker.lorem.paragraph(),
  id: faker.number.int(),
  date: faker.date.recent(),
  title: faker.lorem.words(),
  location: faker.location.city(),
  published: faker.datatype.boolean(),
  updatedAt: new Date(),
  image: faker.image.url(),
};

export { defaultEventData };
