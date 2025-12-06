import { AuthController } from '@controllers';
import { UserRepository } from '@repositories';
import { AuthService, HashProvider } from '@services';

export function makeAuthController(): AuthController {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider(10);

  const authService = new AuthService(userRepository, hashProvider);

  return new AuthController(authService);
}
