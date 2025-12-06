import path from 'path';
import multer from 'multer';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

const BASE_DIR = process.env.COMPRESS_OUTPUT_PATH_DIR || '_temp';
const MAX_FILE_SIZE = 60 * 1024 * 1024;

const getDestination = async (): Promise<string> => {
  const now = new Date();
  const dir = path.join(BASE_DIR, `${now.getFullYear()}`, `${now.getMonth() + 1}`, `${now.getDate()}`);
  await fs.mkdir(dir, { recursive: true });
  return dir;
};

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      const dir = await getDestination();
      cb(null, dir);
    } catch (err) {
      cb(err as any, '');
    }
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const shortId = randomUUID().split('-')[0];
    cb(null, `${Date.now()}-${shortId}${ext}`);
  },
});

export default multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
});
