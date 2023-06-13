import { NestFactory } from '@nestjs/core';
import { SystemModule } from './system.module';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(SystemModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('SYSTEM'));
  await app.startAllMicroservices();
}
bootstrap();
