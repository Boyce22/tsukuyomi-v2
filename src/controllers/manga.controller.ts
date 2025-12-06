import type { Request, Response } from 'express';

import { IMangaService } from '@types';
import { LimitExceeded, MissingFieldsError } from '@exceptions';
import { UUID } from '@utils';

export class MangaController {
  private readonly service: IMangaService;

  constructor(service: IMangaService) {
    this.service = service;
  }

  async getPaginatedMangas(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor ? String(req.query.cursor) : null;

    if (limit <= 0) {
      throw new LimitExceeded('Limit cannot be less than or equal to 0');
    }

    if (limit > 100) {
      throw new LimitExceeded('Limit cannot be greater than 100');
    }

    if (cursor && !UUID.isValid(cursor)) {
      throw new MissingFieldsError('Cursor must be a valid UUID');
    }

    const mangas = await this.service.getPaginatedMangas(cursor, limit);
    res.json(mangas);
  }

  async getChaptersByMangaId(req: Request, res: Response) {
    const mangaId = req.params.mangaId;

    if (!mangaId || !UUID.isValid(mangaId)) {
      throw new MissingFieldsError('Please provide a valid manga id');
    }

    const manga = await this.service.getMangaWithChapters(mangaId);

    res.json(manga);
  }

  async getPagesByChapterId(req: Request, res: Response) {
    const { chapterId, mangaId } = req.params;

    if (!chapterId || !UUID.isValid(chapterId)) {
      throw new MissingFieldsError('Please provide chapter id');
    }

    if (!mangaId || !UUID.isValid(mangaId)) {
      throw new MissingFieldsError('Please provide manga id');
    }

    const pages = await this.service.getPagesByChapterId(mangaId, chapterId, false);
    res.json(pages);
  }

  async getThumbnailPagesByChapterId(req: Request, res: Response) {
    const { chapterId, mangaId } = req.params;

    if (!chapterId || !chapterId.trim()) {
      throw new MissingFieldsError('Please provide chapter id');
    }

    if (!mangaId || Number.isNaN(Number(mangaId))) {
      throw new MissingFieldsError('Please provide manga id');
    }

    const thumbnails = await this.service.getPagesByChapterId(mangaId, chapterId, true);
    res.json(thumbnails);
  }
}
