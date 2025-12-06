import { CommentaryService } from '@services';
import { CommentaryController } from '@controllers';
import { CommentaryRepository, MangaRepository, UserRepository } from '@repositories';

export function makeCommentaryController() {
  const commentaryRepository = new CommentaryRepository();
  const userRepository = new UserRepository();
  const mangaRepository = new MangaRepository();
  const commentaryService = new CommentaryService(commentaryRepository, userRepository, mangaRepository);

  return new CommentaryController(commentaryService);
}
