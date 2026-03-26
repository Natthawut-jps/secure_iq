import { Module } from '@nestjs/common';
import { EMAIL_SENDER } from './email-sender.port';
import { NodemailerEmailSender } from './nodemailer-email-sender';

@Module({
  providers: [
    {
      provide: EMAIL_SENDER,
      useFactory: () =>
        new NodemailerEmailSender({
          host: process.env.SMTP_HOST!,
          port: +process.env.SMTP_PORT!,
          user: process.env.SMTP_USER!,
          password: process.env.SMTP_PASSWORD!,
          from: process.env.SMTP_FROM!,
        }),
    },
  ],
  exports: [EMAIL_SENDER],
})
export class EmailModule {}
