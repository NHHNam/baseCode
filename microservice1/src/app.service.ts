import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order/Order.Schema';
import { Model } from 'mongoose';
import { OrderDto } from './order/OrderDto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
    constructor(
        @InjectModel('Order') private readonly order:Model<Order>,
        @Inject('EMAILSERVICE') private readonly rabbitmqService:ClientProxy,
    ){}

    async handleCreateOrder(order:OrderDto):Promise<any> {
        let newOrder = await this.order.create(order)
        let result = await this.order.find()
        let email =  newOrder.email
        let username = newOrder.userName
        let a = this.rabbitmqService.emit('email_send',{email,username})
        console.log('list of orders ' + result)
        return newOrder
    }
}
