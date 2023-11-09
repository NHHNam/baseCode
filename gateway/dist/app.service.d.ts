import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private readonly clientServiceA;
    private readonly kafkaSerivce;
    constructor(clientServiceA: ClientProxy, kafkaSerivce: ClientProxy);
    sendOPtByGateway(email: string, userName: string): import("rxjs").Observable<{
        message: string;
        duration: number;
    }>;
    sendOptByMicroservice(email: string, userName: string): import("rxjs").Observable<any>;
}
