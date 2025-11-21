import 'dotenv/config';

import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

const rootDir = isProduction ? 'dist' : 'src';
const extension = isProduction ? 'js' : 'ts';

const PORT = parseInt(process.env.DB_PORT!);

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: PORT,
  logging: true,
  schema: process.env.DB_SCHEMA,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${rootDir}/models/*.${extension}`],
  migrations: [`${rootDir}/migrations/*.${extension}`],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
