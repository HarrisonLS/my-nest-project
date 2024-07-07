import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: '<p>你的登录验证码是 123456</p>',
    });
    return '发送成功';
  }
}
