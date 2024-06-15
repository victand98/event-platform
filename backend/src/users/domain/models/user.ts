import { Role } from './role';

class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    id: number = -1,
    role: Role = Role.USER,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.createdAt = createdAt;
  }
}

export { User };
