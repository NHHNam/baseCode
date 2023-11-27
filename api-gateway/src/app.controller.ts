import { Post, Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/user/send-otp')
  sendOpt(@Body() payload: any): Promise<any> {
    return this.appService.sendOpt(payload);
  }
  @Post('rabbitmq/order')
  createOrder(@Body() body: any) {
    return this.appService.createOrder(body);
  }
}
