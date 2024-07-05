import { Role } from './role';

interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;
}

export type { User };
