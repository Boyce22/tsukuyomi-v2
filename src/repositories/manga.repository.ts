import { Repository } from 'typeorm';

import AppDataSource from '@database';
import { Chapter, Manga, Page } from '@models';
import { IMangaRepository, MangaStatus } from '@types';

export class MangaRepository implements IMangaRepository {
  private readonly repository: Repository<Manga>;
  private readonly chapterRepository: Repository<Chapter>;
  private readonly pageRepository: Repository<Page>;

  constructor() {
    this.repository = AppDataSource.getRepository(Manga);
    this.chapterRepository = AppDataSource.getRepository(Chapter);
    this.pageRepository = AppDataSource.getRepository(Page);
  }

  async findById(id: string): Promise<Manga> {
    const manga = await this.repository.findOneBy({ id });

    if (!manga) {
      throw new Error('Manga not found');
    }

    return manga;
  }

  async findChapterById(chapterId: string): Promise<Chapter> {
    const chapter = await this.chapterRepository
      .createQueryBuilder('chapter')
      .select(['chapter.id', 'chapter.title', 'chapter.number'])
      .where('chapter.id = :id', { chapterId })
      .orderBy('chapter.number', 'ASC')
      .getOne();

    if (!chapter) {
      throw new Error('Chapter not found');
    }

    return chapter;
  }

  async findMangaWithChapters(id: string): Promise<Manga> {
    const manga = await this.repository
      .createQueryBuilder('manga')
      .leftJoin('manga.chapters', 'chapter')
      .leftJoin('manga.comments', 'c')
      .leftJoin('c.user', 'u')
      .leftJoin('c.chapter', 'cChapter')
      .select([
        'manga.id',
        'manga.title',
        'manga.status',
        'chapter.id',
        'chapter.title',
        'chapter.number',
        'c.id',
        'c.value',
        'c.chapterId',
        'cChapter.id',
        'cChapter.title',
        'cChapter.number',
        'u.id',
        'u.userName',
        'u.profilePictureUrl',
      ])

      .where('manga.id = :id', { id })
      .getOne();

    if (!manga) throw new Error('Manga not found');
    return manga;
  }

  async findManyWithCursor(cursor: string | null, limit: number): Promise<Manga[]> {
    const qb = this.repository
      .createQueryBuilder('manga')
      .leftJoinAndSelect('manga.tags', 'tags')
      .where('manga.status = :status', { status: MangaStatus.ACTIVED })
      .orderBy('manga.id', 'ASC')
      .take(limit);

    if (cursor) {
      qb.andWhere('manga.id > :cursor', { cursor });
    }

    return qb.getMany();
  }

  async findChaptersByMangaId(mangaId: string): Promise<Chapter[]> {
    return this.chapterRepository
      .createQueryBuilder('chapter')
      .select(['chapter.id', 'chapter.title', 'chapter.number'])
      .where('chapter.mangaId = :id', { id: mangaId })
      .orderBy('chapter.number', 'ASC')
      .getMany();
  }

  async findPagesByChapterId(mangaId: string, chapterId: string): Promise<Page[]> {
    return this.pageRepository
      .createQueryBuilder('page')
      .innerJoin('page.chapter', 'chapter')
      .select(['page.id', 'page.imageUrl', 'page.number', 'page.format'])
      .where('page.chapterId = :chapterId', { chapterId })
      .andWhere('chapter.mangaId = :mangaId', { mangaId })
      .orderBy('page.number', 'ASC')
      .getMany();
  }

  async findThumbnailPagesByChapterId(mangaId: string, chapterId: string): Promise<Page[]> {
    return this.pageRepository
      .createQueryBuilder('page')
      .innerJoin('page.chapter', 'chapter')
      .select(['page.id', 'page.thumbnailUrl', 'page.number', 'page.format'])
      .where('page.chapterId = :chapterId', { chapterId })
      .andWhere('chapter.mangaId = :mangaId', { mangaId })
      .orderBy('page.number', 'ASC')
      .getMany();
  }
}
