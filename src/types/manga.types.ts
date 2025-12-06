import { CursorPage } from '@types';
import type { Chapter, Manga, Page } from '@models';

export enum MangaStatus {
  ACTIVED = 'ACTIVED',
  DISABLED = 'DISABLED',
  REPORTED = 'REPORTED',
  COMPLETED = 'COMPLETED',
  HIATO = 'HIATO',
}

export interface IMangaService {
  getPaginatedMangas(cursor: string | null, limit: number): Promise<CursorPage<Manga>>;
  getMangaWithChapters(mangaId: string): Promise<Manga>;
  getPagesByChapterId(mangaId: string, chapterId: string, thumbnail?: boolean): Promise<Page[]>;
}

export interface IMangaRepository {
  findById(id: string): Promise<Manga>;
  findChapterById(chapterId: string): Promise<Chapter>;
  findManyWithCursor(cursor: string | null, limit: number): Promise<Manga[]>;
  findMangaWithChapters(mangaId: string): Promise<Manga>;
  findPagesByChapterId(mangaId: string, chapterId: string): Promise<Page[]>;
  findThumbnailPagesByChapterId(mangaId: string, chapterId: string): Promise<Page[]>;
}

export interface IMangaController {}
