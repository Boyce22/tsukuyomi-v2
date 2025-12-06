import { Roles } from '@types';
import multer from '@config/multer';
import { accessControl } from '@middlewares';
import { UserController } from '@controllers';

import { Router, Request, Response } from 'express';

//ok
export class UserRouter {
  private readonly router = Router();
  private readonly controller: UserController;

  constructor(controller: UserController) {
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', (req: Request, res: Response) => this.controller.register(req, res));

    this.router.patch(
      '/profile-picture',
      accessControl([Roles.USER]),
      multer.single('file'),
      (req: Request, res: Response) => this.controller.changeProfilePicture(req, res)
    );

    this.router.patch(
      '/profile-banner',
      accessControl([Roles.USER]),
      multer.single('file'),
      (req: Request, res: Response) => this.controller.changeProfileBanner(req, res)
    );

    this.router.patch('/password', accessControl([Roles.USER]), (req: Request, res: Response) =>
      this.controller.changePassword(req, res)
    );
  }

  getRoutes(): Router {
    return this.router;
  }
}
