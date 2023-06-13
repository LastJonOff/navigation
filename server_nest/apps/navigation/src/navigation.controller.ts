import { Controller } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { RmqService } from '@app/common/rmq/rmq.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class NavigationController {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'find_path' })
  async handleFindNearestVertex(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    console.log(12121212, data);
    return this.navigationService.dijkstra(data.graph, data.startVertex);
  }
}
