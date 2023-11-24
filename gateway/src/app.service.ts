import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { OrderDto } from './Order/OrderDto';

@Injectable()
export class AppService {
  constructor(
    @Inject('ADMIN_MICROSERVICE') private readonly kafkaSerivce:ClientProxy,
    @Inject('ORDERSERVICE') private readonly rabbitmqService:ClientProxy,
  ) {}

  
  sendOptByMicroservice(email:string,userName:string) {
    let a = this.kafkaSerivce.emit('sendOpt',{email,userName})
    return a
  }
  handleOrder(order:OrderDto) {
    let a = this.rabbitmqService.emit('order_create',{order})
    return a
  }
}