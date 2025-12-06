import { Commentary } from '@models';

export enum CommentaryStatus {
  ACTIVED = 'ACTIVED',
  DISABLED = 'DISABLED',
  REPORTED = 'REPORTED',
}

export type CreateCommentary = {
  value: string;
  mangaId: string;
  chapterId: string;
};

export interface ICommentaryRepository {
  register(data: Partial<Commentary>): Promise<void>;
  update(id: string, value: string): Promise<void>;
  findByIdWithUser(id: string): Promise<Commentary | null>
}

export interface ICommentaryService {
  register(userId: string, data: CreateCommentary): Promise<void>;
  update(id: string, userId: string, value: string): Promise<void>;
}
