import { logger } from '@utils';
import { Manga, Chapter, Page } from '@models';
import { CursorPage, IMangaRepository, IMangaService } from '@types';

export class MangaService implements IMangaService {
  private readonly mangaRepository: IMangaRepository;

  constructor(mangaRepository: IMangaRepository) {
    this.mangaRepository = mangaRepository;
  }

  async getPaginatedMangas(cursor: string, limit: number): Promise<CursorPage<Manga>> {
    const mangas = await this.mangaRepository.findManyWithCursor(cursor, limit);
    const hasNextPage = mangas.length === limit;
    const nextCursor = hasNextPage ? mangas[mangas.length - 1].id.toString() : null;

    logger.info(`Fetched ${mangas.length} mangas | cursor: "${cursor}" | limit: ${limit}`);

    return { items: mangas, nextCursor, hasNextPage };
  }

  async getMangaWithChapters(mangaId: string): Promise<Manga> {
    const manga = await this.mangaRepository.findMangaWithChapters(mangaId);
    logger.info(`Fetched manga: ${mangaId} with ${manga?.chapters.length} chapters`);
    return manga;
  }

  async getPagesByChapterId(mangaId: string, chapterId: string, thumbnail = false): Promise<Page[]> {
    const pages = thumbnail
      ? await this.mangaRepository.findPagesByChapterId(mangaId, chapterId)
      : await this.mangaRepository.findPagesByChapterId(mangaId, chapterId);

    logger.info(`Fetched ${pages.length} ${thumbnail ? 'thumbnail' : 'full'} pages | chapterId: ${chapterId}`);
    return pages;
  }
}
