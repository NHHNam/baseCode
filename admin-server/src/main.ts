import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls:['amqp://localhost:5672'],
        queue: 'email_queue',
        queueOptions: {
          durable: false
        }
      }
    }
  );
  app.listen();
}
bootstrap();