import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import DatabaseConfig from '../ormconfig';

import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetsModule } from './budgets/budgets.module';
import { BudgetItemsModule } from './budget-items/budget-items.module';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { APP_INTERCEPTOR, HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { Integration } from "@sentry/types";
import { ProfilingIntegration } from '@sentry/profiling-node';

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
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, HttpAdapterHost],
      useFactory: async (
        config: ConfigService,
        adapterHost: HttpAdapterHost,
      ) => ({
        dsn: "https://d559e1feaf024b69b9003f39e69aded9@o4504639496978432.ingest.sentry.io/4504639498551296",
        integrations: [
          new Sentry.Integrations.Http({ tracing: true }),
          new Tracing.Integrations.Express({
            app: adapterHost.httpAdapter.getInstance(),
          }),
          new ProfilingIntegration()
        ] as Integration[],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
      }),
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new SentryInterceptor(),
    }
  ],
})
export class AppModule {}
