import { Injectable, HttpException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import Order from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createOrderDto } from './dto/orderDto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject('SENDMAIL_SERVICE') private readonly sendmailService: ClientProxy,
  ) {}
  async createOrder(payload: createOrderDto) {
    try {
      let { username, email } = payload;
      let order = {
        username,
        email,
        createdDate: new Date(),
      };
      let newOrder = this.orderRepository.create(order);
      await this.orderRepository.save(newOrder);
      console.log(newOrder);
      this.sendmailService.send('send_mail', newOrder);
      const result = { mess: 'Order thành công', data: newOrder };
      return result;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
