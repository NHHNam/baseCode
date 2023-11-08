import { Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly UserLoginService: AppService,
  ) {}
  @MessagePattern('users.sendOpt')
  async handleSenOpt(payload:any) {
    console.log(payload)
    await this.UserLoginService.sendOpt(payload.email,payload.userName)
    return of('check email ').pipe(delay(1000));
  }
}