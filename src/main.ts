import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { PipesConfig } from './config/pipes.config';
import { CorsConfig } from './config/cors.config';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe(PipesConfig));
  app.enableCors(CorsConfig);
  app.use(helmet());
  await app.listen(PORT);
}
bootstrap();
