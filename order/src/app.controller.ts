import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { createOrderDto } from './order/dto/orderDto';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern('create_order')
  async createOrder(payload: createOrderDto) {
    return await this.appService.createOrder(payload);
  }
}
