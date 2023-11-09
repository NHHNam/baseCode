import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Param } from '@nestjs/common/decorators';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/userService/:email/:userName')
  sendEmailByAdminServer(@Param('email') email:string,@Param('userName') userName:string ) {
    return this.appService.sendOPtByGateway(email,userName);
  }
  @Get('/kafka/:email/:userName')
  sendEmailByMicroservice(@Param('email') email:string,@Param('userName') userName:string ) {
    let a  =  this.appService.sendOptByMicroservice(email,userName)
    console.log(a)
    return a;
  }
}
