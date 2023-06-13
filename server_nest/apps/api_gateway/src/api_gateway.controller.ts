import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiGatewayService } from './api_gateway.service';
import { NAVIGATION_SERVICE, SYSTEM_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { FindPathRequest } from 'apps/navigation/src/dto/FIndPathRequest.dto';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject(NAVIGATION_SERVICE) private navigationClient: ClientProxy,
    @Inject(SYSTEM_SERVICE) private systemClient: ClientProxy,
  ) {}

  @Post('navigation/path')
  async createVideo(@Body() request: FindPathRequest) {
    console.log(123123, 'HERE', this.navigationClient);
    return await this.navigationClient.send({ cmd: 'find_path' }, { request });
  }

  @Get('system/info')
  async getVideos() {
    console.log(2222, 'HERE', this.systemClient);
    return await this.systemClient.send({ cmd: 'get_info' }, {});
  }
}
