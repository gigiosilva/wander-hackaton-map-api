import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import DatabaseConfig from '../ormconfig';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EtlModule } from './etl/etl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.required(),
        NODE_ENV: Joi.required(),
        PORT: Joi.required(),
      }),
    }),
    TypeOrmModule.forRoot(DatabaseConfig),
    EtlModule,
  ],
  controllers: [],
})
export class AppModule {}
