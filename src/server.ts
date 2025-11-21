import fs from 'fs/promises';
import { logger } from '@utils';
import AppDataSource from 'src/config/database';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  });
  next();
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const isProd = process.env.NODE_ENV === 'production';
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: isProd ? 'Internal Server Error' : message,
    ...(isProd ? {} : { stack: err.stack }),
  });
});

AppDataSource.initialize()
  .then(() => {
    logger.info('Conexão com o banco de dados estabelecida com sucesso');
    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Falha ao inicializar a conexão com o banco:', error);
    process.exit(1);
  });

app.get('/status', (_req, res) => res.send('OK'));
