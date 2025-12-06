import jwt from 'jsonwebtoken';

import { InvalidCredential } from '@exceptions';
import { IAuthService, IHashProvider, IUserRepository, TAuthToken } from '@types';

export class AuthService implements IAuthService {
  private readonly hash: IHashProvider;
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository, hash: IHashProvider) {
    this.userRepository = userRepository;
    this.hash = hash;
  }

  async authenticate(email: string, password: string): Promise<TAuthToken> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredential();

    const valid = await this.hash.compare(password, user.password);
    if (!valid) throw new InvalidCredential();

    const expiresIn = 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = new Date((issuedAt + expiresIn) * 1000);

    if (user.lastPasswordChange) {
      const lastPasswordChange = Math.floor(user.lastPasswordChange.getTime() / 1000);
      if (issuedAt < lastPasswordChange) {
        throw new InvalidCredential('Password was recently changed. Please log in again.');
      }
    }

    const token = jwt.sign(
      {
        sub: user.id,
        typ: 'access',
        iat: issuedAt,
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
