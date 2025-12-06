import { MangaService } from '@services';
import { MangaController } from '@controllers';
import { MangaRepository } from '@repositories';

export function makeMangaController(): MangaController {
  const mangaRepository = new MangaRepository();
  const mangaService = new MangaService(mangaRepository);

  return new MangaController(mangaService);
}
