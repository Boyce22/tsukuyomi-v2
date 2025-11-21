import multer from "multer";

const baseDir = process.env.COMPRESS_OUTPUT_PATH_DIR || "_temp";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, baseDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanatize = (name: string) =>
      name.replace(/[\\/:*?\"<>|]/g, "_").replace(/[^a-zA-Z0-9.\-_]/g, "");

    cb(null, sanatize(`${uniqueSuffix}-${file.originalname}`));
  },
});

export default multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // Limite 60MB
});
