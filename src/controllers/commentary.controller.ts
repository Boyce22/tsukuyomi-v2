import type { Request, Response } from 'express';

import { CreateCommentary, ICommentaryService } from '@types';
import { MissingFieldsError } from '@exceptions';

export class CommentaryController {
  private readonly service: ICommentaryService;

  constructor(service: ICommentaryService) {
    this.service = service;
  }

  async register(req: Request, res: Response): Promise<void> {
    const userId = req.userId!;
    const dto: CreateCommentary = req.body;

    await this.service.register(userId, dto);

    res.status(201).json({ message: 'Commentary registered' });
  }

  async update(req: Request, res: Response): Promise<void> {
    const userId = req.userId!;
    const id = req.params.id;
    const { value } = req.body;

    if (!value) {
      throw new MissingFieldsError('Please provide a value for commentary');
    }

    await this.service.update(id, userId, value);

    res.status(200).json({ message: 'Commentary updated' });
  }
}
