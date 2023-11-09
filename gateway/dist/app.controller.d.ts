import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sendEmailByAdminServer(email: string, userName: string): import("rxjs").Observable<{
        message: string;
        duration: number;
    }>;
    sendEmailByMicroservice(email: string, userName: string): import("rxjs").Observable<any>;
}
