import { Role, User } from '../../../../src/users';
import { generateTestData } from '../../../utils';

describe('User', () => {
  it('should be defined', () => {
    const { email, password, firstName, lastName } = generateTestData('user');
    const user = new User(email, password, firstName, lastName);

    expect(user).toBeDefined();
  });

  it('should create default values when no parameters are passed', () => {
    const { email, password, firstName, lastName } = generateTestData('user');
    const user = new User(email, password, firstName, lastName);

    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.createdAt).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.role).toBeDefined();
  });

  it('should create the user with the passed parameters', () => {
    const { email, password, firstName, lastName, createdAt, id, role } = generateTestData('user');

    const user = new User(email, password, firstName, lastName, id, role, createdAt);

    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.createdAt).toBe(createdAt);
    expect(user.id).toBe(id);
    expect(user.role).toBe(role);
  });

  it('should create the user with the default role', () => {
    const { email, password, firstName, lastName } = generateTestData('user');
    const user = new User(email, password, firstName, lastName);

    expect(user.role).toBe(Role.USER);
  });
});
