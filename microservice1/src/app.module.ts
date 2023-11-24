import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { OrderSchema } from './order/Order.Schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/aiking'),
    MongooseModule.forFeature([{name:'Order',schema:OrderSchema}]),
    ClientsModule.registerAsync([
      {
        name: 'EMAILSERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'email_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
  ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
