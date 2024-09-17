import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { AppDataSource } from '../data-source';

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
}
bootstrap();
