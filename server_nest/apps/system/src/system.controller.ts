import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq/rmq.service';

@Controller()
export class SystemController {
  constructor(
    private readonly systemService: SystemService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'get_info' })
  async handleGetSystemInfo(@Payload() data: any, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.systemService.getInfo(data);
  }
}
