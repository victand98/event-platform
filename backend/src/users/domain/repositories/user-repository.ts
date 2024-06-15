import { User } from '../models';

interface UserRepository {
  create(user: User): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
}

export { UserRepository };
