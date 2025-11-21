import { Router } from 'express';
import { IAuthController } from '@types';

export class AuthRouter {
  private readonly router: Router;

  constructor(private readonly controller: IAuthController) {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post('/', this.controller.authenticate);
  }

  getRoutes(): Router {
    return this.router;
  }
}
