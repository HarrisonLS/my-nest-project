import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.enableCors();

  // 将uploads目录挂载为静态文件目录
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });

  await app.listen(3000);
}

bootstrap();
