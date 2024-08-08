import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptions {
  path: string
}

@Module({})
export class DbModule {
  // 不同模块里用传不同的参数，我们会用 register 作为方法名。
  static register(options: DbModuleOptions ): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        DbService,
      ],
      exports: [DbService]
    };
  }
}
