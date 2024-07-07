import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'sen',
      resave: false, // 不管有没有修改 session 的内容,每次访问都会更新 session。
      saveUninitialized: false, // 不管是否设置 session，都会初始化一个空的 session 对象。
    }),
  );

  await app.listen(3000);
}
bootstrap();
