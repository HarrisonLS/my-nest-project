import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLogger3 } from './MyLogger3';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MyLogger3],
})
export class AppModule {}
