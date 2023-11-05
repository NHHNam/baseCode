import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import EmailUtils from './email.util';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EmailUtils,AppService],
})
export class AppModule {}