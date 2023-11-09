import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_A',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
    ]),
    ClientsModule.register([
      {
        name:'ADMIN_MICROSERVICE',
        transport: Transport.KAFKA,
        options:{
          client:{
            clientId:'admin',
            brokers:['localhost:29092'],
            
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'admin-consumer'
          }
        },
       
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}