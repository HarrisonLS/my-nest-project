import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.DepartmentCreateInput) {
    // 插入数据之后，再把 id 查询出来返回
    return await this.prisma.department.create({
      data,
      select: {
        id: true,
      },
    });
  }
}
