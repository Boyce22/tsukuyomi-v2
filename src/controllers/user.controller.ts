import type { Request, Response } from 'express';

import { FileRequiredError, MissingFieldsError } from '@exceptions';

import { CreateUser, IUserService } from '@types';

export class UserController {
  private readonly service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    await this.service.register(dto);

    res.status(201).send('User registered successfully');
  }

  async changeProfilePicture(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Please provide a picture');
    }

    const id = req.userId!;

    await this.service.changeProfilePicture(id, req.file);

    res.status(204).send();
  }

  async changeProfileBanner(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Please provide a picture');
    }

    const id = req.userId!;

    await this.service.changeProfileBanner(id, req.file);

    res.status(204).send();
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      throw new MissingFieldsError('Please provide the old password and new password');
    }

    const id = req.userId!;

    await this.service.changePassword(id, password, newPassword);

    res.status(204).send();
  }
}
