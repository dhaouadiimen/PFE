import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.use('/', express.static('./src/static'));
  app.enableCors();
  await app.listen(3000);
  
}
bootstrap();