import pino, { Logger as PinoLogger } from 'pino';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const LOG_DIR = path.join(process.cwd(), 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const isProd = process.env.NODE_ENV === 'production';

const REDACT_FIELDS = ['password', 'token', 'authorization', '*.password', '*.token'];

const getRequestId = () => crypto.randomUUID();

const prodTransport = {
  targets: [
    {
      target: 'pino/file',
      level: 'info',
      options: { destination: path.join(LOG_DIR, 'app.log') },
    },
    {
      target: 'pino/file',
      level: 'error',
      options: { destination: path.join(LOG_DIR, 'error.log') },
    },
  ],
};

const devTransport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
    singleLine: false,
  },
};

const buildTransport = () => (isProd ? prodTransport : devTransport);

const baseLogger = pino({
  name: process.env.APP_NAME ?? 'app',
  level: process.env.LOG_LEVEL ?? (isProd ? 'info' : 'debug'),
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: REDACT_FIELDS,
    censor: '[REDACTED]',
  },
  ...(isProd
    ? {}
    : {
        formatters: {
          level(label: string) {
            return { level: label };
          },
        },
      }),
  mixin() {
    return { requestId: getRequestId() };
  },
  transport: buildTransport(),
});

export class Logger {
  private readonly logger: PinoLogger;

  constructor(context?: string | object) {
    if (context) {
      const ctx = typeof context === 'string' ? { context } : context;
      this.logger = baseLogger.child(ctx);
    } else {
      this.logger = baseLogger;
    }
  }

  private safeMeta(meta?: unknown) {
    return meta && typeof meta === 'object' ? meta : {};
  }

  trace(msg: string, meta?: unknown) {
    this.logger.trace(this.safeMeta(meta), msg);
  }

  debug(msg: string, meta?: unknown) {
    this.logger.debug(this.safeMeta(meta), msg);
  }

  info(msg: string, meta?: unknown) {
    this.logger.info(this.safeMeta(meta), msg);
  }

  warn(msg: string, meta?: unknown) {
    this.logger.warn(this.safeMeta(meta), msg);
  }

  error(msg: string, meta?: unknown) {
    this.logger.error(this.safeMeta(meta), msg);
  }

  fatal(msg: string, meta?: unknown) {
    this.logger.fatal(this.safeMeta(meta), msg);
  }

  child(context: string | object) {
    return new Logger(context);
  }
}

export const logger = new Logger();

export const createLogger = (context: string | object) => new Logger(context);
