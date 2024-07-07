import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { UserModule } from './user/user.module';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      // 默认语言是 en，资源包在 i18n 目录下
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n'),
        watch: true,
      },
      // // resolver 也就是从哪里读取当前语言信息，这里是从 query 中读取，比如 ?lang=en、?l=zh
      resolvers: [
        // 自定义 header、cookie、accepet-language 的 header
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(['lang']),
        AcceptLanguageResolver,
      ],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
