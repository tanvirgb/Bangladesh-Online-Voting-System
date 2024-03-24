import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHey(): string {
    return 'Hi Ramisa! :)';
  }
}
