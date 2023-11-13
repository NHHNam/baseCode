import { HttpException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  async sendOtp(payload: any) {
    try {
      let { email } = payload;
      let otp = Math.random().toString(36).slice(-6);
      await this.mailerService.sendMail({
        to: `${email}`,
        subject: 'Send OTP',
        html: `<b>This is your OTP: ${otp}</b>`,
      });
      return 'Send OTP';
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
