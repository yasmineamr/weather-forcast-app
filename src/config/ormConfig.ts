import { configDotenv } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

configDotenv();

export const PostgreSqlDataSource: TypeOrmModuleOptions = {
  type: "postgres", // process.env.DB_TYPE,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  schema: process.env.DB_SCHEMA,
  entities: [join(process.cwd(), 'dist/**/*.entity.js')],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};