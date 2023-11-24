import { Post,Body ,Controller, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { OrderDto } from './order/OrderDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('order_create')
  async handleSenOpt(payload:any) {
    console.log("handle create order")
    let a = await this.appService.handleCreateOrder(payload.order)
    console.log(a)
    return payload
  }
}
