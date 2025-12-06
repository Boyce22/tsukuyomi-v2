import { Repository } from 'typeorm';

import { User } from '@models';
import AppDataSource from '@database';
import { CreateUser, IUserRepository } from '@types';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async update(id: string, data: Partial<User>, userFound?: User): Promise<string> {
    const user = userFound ?? (await this.repository.findOneBy({ id }));

    if (!user) {
      throw new Error('User not found');
    }

    this.repository.merge(user, data);

    await this.repository.save(user);

    return 'User updated successfully';
  }

  async register(dto: CreateUser): Promise<User> {
    const user = this.repository.create({
      email: dto.email,
      name: dto.name,
      lastName: dto.lastName,
      birthDate: dto.birthDate,
      password: dto.password,
      userName: dto.userName,
      profilePictureUrl: 'string',
      biography: 'Account created recently on Tsukuyomi.',
    });

    return await this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByIdWithRoles(id: string): Promise<User | null> {
    return await this.repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.password', 'user.lastPasswordChange'])
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.password'])
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findLastPasswordChangeById(id: string): Promise<User | null> {
    return await this.repository
      .createQueryBuilder('user')
      .where({ id: id })
      .select('user.lastPasswordChange')
      .getOne();
  }
}
