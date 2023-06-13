import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
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
        RABBIT_MQ_SYSTEM_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/system/.env',
    }),
    DatabaseModule,
    RmqModule,
  ],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
