import { MangaController } from '@controllers';
import { Router, Request, Response } from 'express';

export class MangaRoutes {
  private readonly router = Router();

  constructor(private readonly controller: MangaController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', (req, res) => this.controller.getPaginatedMangas(req, res));
    this.router.get('/:mangaId/chapters', (req, res) => this.controller.getChaptersByMangaId(req, res));
    this.router.get('/:mangaId/chapters/:chapterId/pages', (req, res) => this.controller.getPagesByChapterId(req, res));
    this.router.get('/:mangaId/chapters/:chapterId/thumbnails', (req, res) =>
      this.controller.getThumbnailPagesByChapterId(req, res)
    );
  }

  getRoutes(): Router {
    return this.router;
  }
}
