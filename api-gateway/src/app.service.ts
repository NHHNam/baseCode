import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { createOrderDto } from './order/orderDto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: ClientKafka,
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
  ) {}
  async onApplicationShutdown() {
    await this.usersService.close();
  }
  async onModuleInit() {
    const requestPatterns = ['users.send-otp'];
    requestPatterns.forEach((pattern) => {
      this.usersService.subscribeToResponseOf(pattern);
    });
    await this.usersService.connect();
  }
  async sendOpt(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.usersService.send('users.send-otp', payload).subscribe((data) => {
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  createOrder(body: createOrderDto) {
    return this.orderService.send('create_order', body);
  }
}
