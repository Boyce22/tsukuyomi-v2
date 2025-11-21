import { User } from '@models';

export type CreateUser = {
  email: string;
  name: string;
  lastName: string;
  userName: string;
  birthDate: string;
  password: string;
};

export interface IUserService {
  register(dto: CreateUser): Promise<User>;
  changePassword(id: string, password: string, newPassword: string): Promise<string>;
  changeProfileBanner(id: string, file: Express.Multer.File): Promise<string>;
  changeProfilePicture(id: string, file: Express.Multer.File): Promise<string>;
}

export interface IUserRepository {
  register(dto: CreateUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<string>;
}

export interface IUserRoleRepository {
  associate(userId: string, roleId: string): Promise<void>;
}
