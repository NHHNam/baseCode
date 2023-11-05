import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Param } from '@nestjs/common/decorators';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/userService/:email/:userName')
  userService(@Param('email') email:string,@Param('userName') userName:string ) {
    return this.appService.sendOPt(email,userName);
  }
 
}
