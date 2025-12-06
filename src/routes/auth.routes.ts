import { AuthController } from '@controllers';
import { Router, Request, Response } from 'express';

export class AuthRouter {
  private readonly router = Router();

  constructor(private readonly controller: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', (req: Request, res: Response) => this.controller.authenticate(req, res));
  }

  getRoutes(): Router {
    return this.router;
  }
}
