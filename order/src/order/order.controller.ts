import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createOrderDto } from './dto/orderDto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @MessagePattern('create_order')
  createOrder(payload: createOrderDto) {
    return this.orderService.createOrder(payload);
  }
}
