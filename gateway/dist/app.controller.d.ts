import { AppService } from './app.service';
import { OrderDto } from './Order/OrderDto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sendEmailByMicroservice(email: string, userName: string): import("rxjs").Observable<any>;
    handleCreateOrder(order: OrderDto): string;
}
