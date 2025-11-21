import jwt from 'jsonwebtoken';

import { InvalidCredential } from '@exceptions';
import { IAuthService, IHashProvider, IUserRepository, TAuthToken } from '@types';

export class AuthService implements IAuthService {
  private readonly hash: IHashProvider;
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository, hash: IHashProvider) {
    this.hash = hash;
    this.userRepository = userRepository;
  }

  async authenticate(email: string, password: string): Promise<TAuthToken> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredential();
    }

    const valid = await this.hash.compare(password, user.password);
    if (!valid) {
      throw new InvalidCredential();
    }

    const expiresIn = 60 * 60;

    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    const token = jwt.sign(
      {
        sub: user.id,
        typ: 'access',
      },
      process.env.JWT_SECRET!,
      { expiresIn }
    );

    return {
      accessToken: token,
      expiresAt,
      message: 'Authenticated',
    };
  }
}
