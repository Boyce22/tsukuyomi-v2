import { Router } from 'express';

import { AuthRouter } from './auth.routes';
import { UserRouter } from './user.routes';
import { MangaRoutes } from './manga.routes';
import { CommentaryRouter } from './commentary.routes';

import { makeUserController, makeAuthController, makeMangaController, makeCommentaryController } from '@factories';

const router = Router();

router.use('/auth', new AuthRouter(makeAuthController()).getRoutes());
router.use('/users', new UserRouter(makeUserController()).getRoutes());
router.use('/mangas', new MangaRoutes(makeMangaController()).getRoutes());
router.use('/comments', new CommentaryRouter(makeCommentaryController()).getRoutes())
export default router;
