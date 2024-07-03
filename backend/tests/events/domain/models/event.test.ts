import { Event } from '../../../../src/events';
import { generateTestData } from '../../../utils';

describe('Event', () => {
  it('should be defined', () => {
    const { title, comunity, description, date, location } = generateTestData('event');
    const event = new Event(title, comunity, description, date, location);

    expect(event).toBeDefined();
  });

  it('should create default values when no parameters are passed', () => {
    const { title, comunity, description, date, location } = generateTestData('event');
    const event = new Event(title, comunity, description, date, location);

    expect(event.title).toBe(title);
    expect(event.comunity).toBe(comunity);
    expect(event.description).toBe(description);
    expect(event.date).toBe(date);
    expect(event.location).toBe(location);
    expect(event.id).toBeDefined();
    expect(event.image).toBeNull();
    expect(event.published).toBe(false);
    expect(event.createdAt).toBeDefined();
    expect(event.updatedAt).toBeDefined();
  });

  it('should create the event with the passed parameters', () => {
    const { comunity, createdAt, date, description, id, image, location, published, title, updatedAt } =
      generateTestData('event');

    const event = new Event(title, comunity, description, date, location, id, image, published, createdAt, updatedAt);

    expect(event.title).toBe(title);
    expect(event.comunity).toBe(comunity);
    expect(event.description).toBe(description);
    expect(event.date).toBe(date);
    expect(event.location).toBe(location);
    expect(event.id).toBe(id);
    expect(event.image).toBe(image);
    expect(event.published).toBe(published);
    expect(event.createdAt).toBe(createdAt);
    expect(event.updatedAt).toBe(updatedAt);
  });
});
