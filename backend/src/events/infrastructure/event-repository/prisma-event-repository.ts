import prisma from '../../../../prisma';
import { Event, EventRepository } from '../../domain';

class PrismaEventRepository implements EventRepository {
  async create(event: Event): Promise<Event> {
    return await prisma.event.create({
      data: {
        comunity: event.comunity,
        date: event.date,
        description: event.description,
        location: event.location,
        title: event.title,
        image: event.image,
        published: event.published,
      },
    });
  }
}

export { PrismaEventRepository };