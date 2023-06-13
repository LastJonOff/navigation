import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { RmqModule } from '@app/common/rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_NAVIGATION_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/navigation/.env',
    }),
    DatabaseModule,
    RmqModule,
  ],
  controllers: [NavigationController],
  providers: [NavigationService],
})
export class NavigationModule {}
