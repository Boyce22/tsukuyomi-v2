import { UserController } from '@controllers';
import { UserRepository, UserRoleRepository } from '@repositories';
import { UserService, HashProvider, BackBlazeService, ImageCompressionService } from '@services';

export function makeUserController(): UserController {
  const userRepository = new UserRepository();
  const userRoleRepository = new UserRoleRepository();
  const hashProvider = new HashProvider(10);
  const storageService = new BackBlazeService();
  const imageCompressor = new ImageCompressionService();

  const userService = new UserService(userRepository, hashProvider, userRoleRepository, storageService, imageCompressor);

  return new UserController(userService);
}
