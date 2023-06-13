import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  async getInfo(data: any) {
    console.log(data, 'getInfo');
    return true;
  }
}
