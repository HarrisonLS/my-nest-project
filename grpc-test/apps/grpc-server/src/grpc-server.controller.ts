import { Controller, Get } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GrpcServerController {
  constructor(private readonly grpcServerService: GrpcServerService) {}

  @Get()
  getHello(): string {
    return this.grpcServerService.getHello();
  }

  @GrpcMethod('BookService', 'FindBook')
  findOne(data: { id: number }) {
    const items = [
      { id: 1, name: '前端调试', desc: '网页和node调试' },
      { id: 2, name: 'NestJS', desc: 'nest和中间件' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
