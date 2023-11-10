import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['POST'],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: true,
      enableDebugMessages: true,
    }),
  );
  app.startAllMicroservices();
  const config = new DocumentBuilder()
  .setTitle('Gateway')
  .setVersion('1.0')
  .addTag('gateway')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(8080,()=>console.log('api : localhost:8080'));
}
bootstrap();
