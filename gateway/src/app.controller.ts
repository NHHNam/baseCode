import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Body, Param } from '@nestjs/common/decorators';
import { OrderDto } from './Order/OrderDto';
import { randomInt } from 'crypto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/kafka/:email/:userName')
  sendEmailByMicroservice(@Param('email') email:string,@Param('userName') userName:string ) {
    let a  =  this.appService.sendOptByMicroservice(email,userName)
    console.log(a)
    return a;
  }
  @Get('/rabbitmq')
  handleCreateOrder(@Body('order') order:OrderDto ) {
    this.appService.handleOrder(order)
    return 'check mail';
  }
}
