export interface IRoleRepository {}

export interface IRoleService {}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  MODERATOR = 'MODERATOR',
}

export type Role = (typeof Roles)[keyof typeof Roles];
