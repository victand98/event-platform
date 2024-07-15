import { Event } from '@/modules';
import { faker } from '@faker-js/faker';

const defaultEventData: Event = {
  createdAt: faker.date.recent().toISOString(),
  comunity: faker.company.name(),
  description: faker.lorem.paragraph(),
  id: faker.number.int(),
  date: faker.date.recent().toISOString(),
  title: faker.lorem.words(),
  location: faker.location.city(),
  published: faker.datatype.boolean(),
  updatedAt: faker.date.recent().toISOString(),
  image: faker.image.url(),
};

export { defaultEventData };
