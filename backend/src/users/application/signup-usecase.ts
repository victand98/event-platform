import { BadRequestError, Logger, PasswordEncoder } from '../../shared';
import { User, UserRepository } from '../domain';

class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private logger: Logger,
    private passwordEncoder: PasswordEncoder
  ) {}

  async run(data: User): Promise<User> {
    const { email, password, firstName, lastName } = data;

    const user = await this.userRepository.getByEmail(email);

    if (user) {
      const error = new BadRequestError({ message: 'User already exists' });
      this.logger.error(error.message);
      throw error;
    }

    const encodedPassword = await this.passwordEncoder.encode(password);
    const newUser = new User(email, encodedPassword, firstName, lastName);
    return this.userRepository.create(newUser);
  }
}

export { SignUpUseCase };
