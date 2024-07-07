import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    console.log(3);
    console.log('appService: ', this.appService);

    return await this.appService.getHello();
  }
}
