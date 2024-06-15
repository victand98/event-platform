import prisma from '../../../../prisma';
import { User, UserRepository } from '../../domain';

class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    return await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      },
    });
  }
  async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
}

export { PrismaUserRepository };
