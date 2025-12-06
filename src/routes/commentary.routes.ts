import { Roles } from '@types';
import { accessControl } from '@middlewares';
import { CommentaryController } from '@controllers';

import { Router, Request, Response } from 'express';

export class CommentaryRouter {
  private readonly router = Router();
  private readonly controller: CommentaryController;

  constructor(controller: CommentaryController) {
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', accessControl([Roles.USER]), (req: Request, res: Response) =>
      this.controller.register(req, res)
    );
    this.router.patch('/:id', accessControl([Roles.USER]), (req: Request, res: Response) =>
      this.controller.update(req, res)
    );
  }

  getRoutes(): Router {
    return this.router;
  }
}
