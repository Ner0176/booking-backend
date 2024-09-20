import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const getOrmConfig = (): DataSourceOptions => ({
  type: 'postgres',
  host: 'localhost',
  synchronize: false,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
