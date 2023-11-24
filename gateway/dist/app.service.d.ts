import { ClientProxy } from '@nestjs/microservices';
import { OrderDto } from './Order/OrderDto';
export declare class AppService {
    private readonly kafkaSerivce;
    private readonly rabbitmqService;
    constructor(kafkaSerivce: ClientProxy, rabbitmqService: ClientProxy);
    sendOptByMicroservice(email: string, userName: string): import("rxjs").Observable<any>;
    handleOrder(order: OrderDto): import("rxjs").Observable<any>;
}
