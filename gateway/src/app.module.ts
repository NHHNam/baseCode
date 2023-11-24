import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDERSERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'order_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
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