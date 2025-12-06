import { logger } from '@utils';
import { Chapter, Commentary, Manga, User } from '@models';
import { CreateCommentary, ICommentaryRepository, ICommentaryService, IMangaRepository, IUserRepository } from '@types';
import { CommentaryNotFoundError, MangaNotFoundError, UserNotFoundError, ForbiddenActionError } from '@exceptions';

export class CommentaryService implements ICommentaryService {
  constructor(
    private readonly repository: ICommentaryRepository,
    private readonly userRepository: IUserRepository,
    private readonly mangaRepository: IMangaRepository
  ) {}

  async register(userId: string, dto: CreateCommentary): Promise<void> {
    const [user, manga] = await Promise.all([
      this.userRepository.findById(userId),
      this.mangaRepository.findById(dto.mangaId),
    ]);

    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    if (!manga) {
      throw new MangaNotFoundError('Manga not found');
    }

    const chapter = dto.chapterId ? await this.mangaRepository.findChapterById(dto.chapterId) : null;

    await this.processRegisterCommentary(user, manga, chapter, dto).catch((error) =>
      logger.error('Error processing register commentary:', error)
    );
  }

  async update(id: string, userId: string, value: string): Promise<void> {
    const commentary = await this.repository.findByIdWithUser(id);

    if (!commentary) {
      throw new CommentaryNotFoundError('Commentary not found');
    }

    if (commentary.user.id !== userId) {
      throw new ForbiddenActionError('Not allowed to edit this commentary');
    }

    await this.processUpdateCommentary(commentary, value).catch((error) =>
      logger.error('Error processing update commentary:', error)
    );
  }

  private async processRegisterCommentary(
    user: User,
    manga: Manga,
    chapter: Chapter | null,
    dto: CreateCommentary
  ): Promise<void> {
    const commentary = new Commentary();
    commentary.user = user;
    commentary.manga = manga;
    commentary.value = dto.value;

    if (chapter) {
      commentary.chapter = chapter;
    }

    await this.repository.register(commentary);
  }

  private async processUpdateCommentary(commentary: Commentary, value: string): Promise<void> {
    await this.repository.update(commentary.id, value);
  }
}
