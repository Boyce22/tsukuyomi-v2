import type { Request, Response } from 'express';

import { FileRequiredError } from '@exceptions';

import { CreateUser, IUserService, IFileService, IAuthService } from '@types';

export class UserController {
  private readonly userService: IUserService;
  private readonly authService: IAuthService;

  constructor(userService: IUserService, authService: IAuthService, fileService: IFileService) {
    this.userService = userService;
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateUser = req.body;

    const user = await this.userService.register(dto);

    const token = await this.authService.authenticate(user.email, dto.password);

    res.status(201).json(token);
  }

  async changeProfilePicture(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Please provide a photo');
    }

    const id = req.userId!;

    await this.userService.changeProfilePicture(id, req.file);

    res.status(204).send();
  }

  async changeProfileBanner(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new FileRequiredError('Please provide a phaoto');
    }

    const id = req.userId!;

    await this.userService.changeProfileBanner(id, req.file);

    res.status(204).send();
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const { password, newPassword } = req.body;
    const id = req.userId!;

    await this.userService.changePassword(id, password, newPassword);

    res.status(204).send();
  }
}
