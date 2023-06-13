import { NestFactory } from '@nestjs/core';
import { NavigationModule } from './navigation.module';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(NavigationModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('NAVIGATION'));
  await app.startAllMicroservices();
}
bootstrap();
