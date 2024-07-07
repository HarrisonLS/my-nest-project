import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  // constructor() {
  //   this.transporter = createTransport({
  //     host: 'smtp.qq.com',
  //     port: 587,
  //     secure: true, // true for 465, false for other ports
  //     auth: {
  //       user: '554106880@qq.com', // 个人邮箱地址
  //       pass: 'cnwlxwvlvhqmbcic', // 邮箱授权码
  //     },
  //   });
  // }
  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('nodemailer_host'),
      port: this.configService.get('nodemailer_port'),
      secure: false,
      auth: {
        user: this.configService.get('nodemailer_auth_user'),
        pass: this.configService.get('nodemailer_auth_pass'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: this.configService.get('nodemailer_auth_user'),
      }, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });
  }
}
