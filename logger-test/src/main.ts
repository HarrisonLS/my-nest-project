import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';
import { MyLogger } from './MyLogger';
import { MyLogger2 } from './MyLogger2';
import { MyLogger3 } from './MyLogger3';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger3));
  await app.listen(3000);
}
bootstrap();
