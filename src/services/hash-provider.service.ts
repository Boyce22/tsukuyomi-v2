import bcrypt from 'bcryptjs';
import { IHashProvider } from '@types';

export class HashProvider implements IHashProvider {
  private saltRounds: number = 10;

  constructor(saltRounds: null | number) {
    if (saltRounds) {
      this.saltRounds = saltRounds;
    }
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
