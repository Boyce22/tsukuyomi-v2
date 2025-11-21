import { Repository } from 'typeorm';

import AppDataSource from 'src/config/database';
import { Role, UserRole } from '@models';

import { IUserRoleRepository, Roles } from '@types';

export class UserRoleRepository implements IUserRoleRepository {
  private repository: Repository<UserRole>;
  private roleRepository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserRole);
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async associate(userId: string, roleName: Roles): Promise<void> {
    const role = await this.roleRepository.findOneBy({ name: roleName });

    if (!role) {
      throw new Error(`Role '${roleName}' not found`);
    }

    const exists = await this.repository.findOneBy({ userId, roleId: role.id });
    if (exists) return;

    await this.repository.insert({ userId, roleId: role.id });
  }
}
