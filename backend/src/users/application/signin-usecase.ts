import { BadRequestError, PasswordEncoder } from '../../shared';
import { User, UserRepository } from '../domain';

class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordEncoder: PasswordEncoder
  ) {}

  async run(email: string, password: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestError({ message: 'Invalid credentials' });
    }

    const isValidPassword = await this.passwordEncoder.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestError({ message: 'Invalid credentials' });
    }

    return user;
  }
}

export { SignInUseCase };
