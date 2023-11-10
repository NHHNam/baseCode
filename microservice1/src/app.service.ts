import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService:ClientKafka
  ){
  }
  async onApplicationShutdown() {
    await this.usersService.close();
  }
  async onModuleInit() {
    const requestPatterns = ['users.sendOpt'];
    requestPatterns.forEach((pattern) => {
      this.usersService.subscribeToResponseOf(pattern);
    });
    await this.usersService.connect();
  }
  async sendOpt(email:string,userName:string):Promise<any>{
    return new Promise((resolve,reject)=>{
      try {
        this.usersService
        .send('users.sendOpt', {email,userName})
        .subscribe((data) => {
          console.log(data);
          resolve(data);
        })
        } catch(err) {
        reject(err)
      }
    })
  }
}
