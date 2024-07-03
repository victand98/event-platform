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

  async getAll(): Promise<Event[]> {
    return await prisma.event.findMany();
  }

  async getById(id: number): Promise<Event | null> {
    return await prisma.event.findUnique({ where: { id, participants: { every: { eventId: id } } } });
  }

  async update(event: Event): Promise<Event> {
    return await prisma.event.update({
      where: { id: event.id },
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
