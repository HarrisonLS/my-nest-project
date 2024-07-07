import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async getHello() {
    console.log('redisClient: ', this.redisClient);

    const value = await this.redisClient.keys('*');
    console.log(value);

    return 'Hello World!';
  }
}
