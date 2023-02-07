import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import DatabaseConfig from '../ormconfig';

import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetsModule } from './budgets/budgets.module';
import { BudgetItemsModule } from './budget-items/budget-items.module';


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
    UsersModule,
    BudgetsModule,
    BudgetItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
