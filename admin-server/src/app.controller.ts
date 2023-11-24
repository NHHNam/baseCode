import { Controller, Param } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly UserLoginService: AppService,
  ) {}
  @EventPattern('email_send')
  async handleSenOpt(payload:any) {
    console.log("send email")
    await this.UserLoginService.sendOpt(payload.email,payload.username)
    console.log(payload)
    return payload
  }
}