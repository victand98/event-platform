import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

import { PasswordEncoder } from '../../domain';

const scryptAsync = promisify(scrypt);

class CryptoPasswordEncoder implements PasswordEncoder {
  async encode(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  async compare(password: string, encodedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = encodedPassword.split('.');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashedPassword;
  }
}

export { CryptoPasswordEncoder };
