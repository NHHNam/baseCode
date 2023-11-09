import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
    @Inject('ADMIN_MICROSERVICE') private readonly kafkaSerivce:ClientProxy
  ) {}

  sendOPtByGateway(email:string,userName:string) {
    const startTs = Date.now();
    const pattern = { cmd: 'sendOpt' };
    const payload = {
      email ,
      userName
    };
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
  sendOptByMicroservice(email:string,userName:string) {
    let a = this.kafkaSerivce.emit('sendOpt',{email,userName})
    return a
  }
 
}