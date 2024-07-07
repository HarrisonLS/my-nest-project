import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: '测试 aaa', description: 'aaa 描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'aaa 成功',
    type: String,
  })
  @Get('aaa')
  aaa(@Query('a1') a1, @Query('a2') a2) {
    console.log(a1, a2);
    return 'aaa success';
  }

  @Get('bbb/:id')
  bbb(@Param('id') id) {
    console.log(id);
    return 'bbb success';
  }

  @Post('ccc')
  ccc(@Body('ccc') ccc) {
    console.log(ccc);
    return 'ccc success';
  }
}
