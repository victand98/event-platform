import { Role } from './role';

class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;

  constructor(
    id: number = -1,
    email: string,
    firstName: string,
    lastName: string,
    role: Role = Role.USER,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.createdAt = createdAt;
  }
}

export { User };
