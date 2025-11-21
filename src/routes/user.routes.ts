import { UserController } from '@controllers';
import { Router, Request, Response } from 'express';

export class UserRouter {
  private readonly router = Router();
  private readonly controller: UserController;

  constructor(controller: UserController) {
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', (req: Request, res: Response) => this.controller.register(req, res));

    this.router.patch('/profile-picture', (req: Request, res: Response) =>
      this.controller.changeProfilePicture(req, res)
    );

    this.router.patch('/profile-banner', (req: Request, res: Response) =>
      this.controller.changeProfileBanner(req, res)
    );

    this.router.patch('/password', (req: Request, res: Response) => this.controller.changePassword(req, res));
  }

  getRoutes(): Router {
    return this.router;
  }
}
