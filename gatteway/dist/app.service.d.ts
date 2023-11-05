import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private readonly clientServiceA;
    constructor(clientServiceA: ClientProxy);
    sendOPt(email: string, userName: string): import("rxjs").Observable<{
        message: string;
        duration: number;
    }>;
}
