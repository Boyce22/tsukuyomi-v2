import { Repository } from 'typeorm';

import { Role } from '@models';
import AppDataSource from 'src/config/database';
import { IRoleRepository } from '@types';

export class RoleRepository implements IRoleRepository {
  private readonly repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }
}
