import { EmailConfig, EmailOptions, IEmailSender } from './email-sender.port';
import { Resend } from 'resend';

export class NodemailerEmailSender implements IEmailSender {
  private resend = new Resend('re_xxxxxxxxx');

  constructor(private readonly config: EmailConfig) {}

  async send(options: EmailOptions): Promise<void> {
    await this.resend.emails.send({
      from: this.config.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
