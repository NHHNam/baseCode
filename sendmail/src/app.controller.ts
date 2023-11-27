import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern('users.send-otp')
  handleSendOtp(@Payload() payload: any) {
    return this.appService.sendOtp(payload);
  }
  @MessagePattern('send_mail')
  async sendMail(@Payload() payload: any) {
    console.log(payload);
    console.log('check mail di');
    return await this.appService.sendMail(payload);
  }
}
