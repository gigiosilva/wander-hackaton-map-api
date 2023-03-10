import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  ...(process.env.NODE_ENV !== 'dev' && {
    ssl: true,
    extra: {
      ssl: { rejectUnauthorized: false },
    },
  }),
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  migrations: [`${__dirname}/database/migrations/*.{ts,js}`],
  entities: [`${__dirname}/src/**/*.entity.{ts,js}`],
  cli: {
    migrationsDir: 'database/migrations',
  },
  synchronize: false,
  migrationsRun: false,
} as TypeOrmModuleOptions;