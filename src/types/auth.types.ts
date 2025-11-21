import type { Request, Response } from 'express';

export interface IAuthService {
  /**
   * Autentica um usuário e retorna um token JWT.
   *
   * @param email Email do usuário.
   * @param password Senha do usuário.
   * @returns Promise contendo o token JWT.
   */
  authenticate(email: string, password: string): Promise<TAuthToken>;
}

export interface IAuthController {
  /**
   * Recebe a requisição HTTP e executa o processo de autenticação.
   *
   * @param req Objeto da requisição Express.
   * @param res Objeto de resposta Express.
   * @returns Promise<void> - operação assíncrona sem retorno direto.
   */
  authenticate(req: Request, res: Response): Promise<void>;
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
