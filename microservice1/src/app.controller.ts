import { Post,Body ,Controller, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/user/sendOpt/:email/:userName')
  sendOpt(@Param('email') email:string,@Param('userName') userName:string):Promise<any> {
    return new Promise(async(resolve,rejects)=>{
      try {
        let result = this.appService.sendOpt(email,userName)
        resolve(result)
      }catch(err) {
        rejects(err)
      }
    })
  }
}
