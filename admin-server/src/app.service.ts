import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import EmailUtils from './email.util';
import { randomUUID } from 'crypto';
@Injectable()
export class AppService {
  constructor(
    private readonly emailUtils:EmailUtils,
  ){}
  async sendOpt(email:string,userName:string): Promise<any> {
    return new Promise(async(resolve,rejects)=>{
      try {
        let opt = randomUUID()
        let result= await this.emailUtils.sendEmail(email,opt,'user service send opt')
        resolve(result)
      } catch(err) {
        rejects(err)
      }
    })
   
  }
 
}
