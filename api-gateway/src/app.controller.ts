import { Post, Body, Controller, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/user/send-otp')
  sendOpt(@Body() payload: any): Promise<any> {
    return this.appService.sendOpt(payload);
  }
}
