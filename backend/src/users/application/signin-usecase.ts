import { BadRequestError, Jwt, PasswordEncoder } from '../../shared';
import { User, UserRepository } from '../domain';

class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordEncoder: PasswordEncoder,
    private jwt: Jwt
  ) {}

  async run(email: string, password: string): Promise<User & { token: string }> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestError({ message: 'Invalid credentials' });
    }

    const isValidPassword = await this.passwordEncoder.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestError({ message: 'Invalid credentials' });
    }

    const token = this.jwt.sign({ id: user.id, role: user.role });

    return { ...user, token };
  }
}

export { SignInUseCase };
