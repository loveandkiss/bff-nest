import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('getHello')
    return 'Hello World! 222266666';
  }
}
