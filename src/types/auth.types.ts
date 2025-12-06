export interface IAuthService {
  authenticate(email: string, password: string): Promise<TAuthToken>;
}
export interface IHashProvider {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export type TAuthToken = {
  accessToken: string;
  expiresAt: Date;
  message: string;
};
