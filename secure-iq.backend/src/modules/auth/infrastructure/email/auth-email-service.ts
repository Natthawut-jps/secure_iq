import { IEmailSender } from '../../../../common/emails/email-sender.port';
import { IAuthEmailService } from '../../application/ports/auth-email.service.port';

export class AuthEmailService implements IAuthEmailService {
  constructor(private readonly emailService: IEmailSender) {}

  async sendVerificationEmail(
    email: string,
    aggregateId: string,
    verifyLink: string,
  ): Promise<void> {
    await this.emailService.send({
      to: email,
      subject: 'ยืนยันอีเมลของคุณ',
      templateId: 'verify-email',
      html: this.verifyEmailTemplate(verifyLink),
      variables: { userId: aggregateId, email: email },
    });
  }
  private verifyEmailTemplate(verifyLink: string): string {
    return `<h1>ยืนยันอีเมลของคุณ ${verifyLink}</h1><p>กรุณายืนยันอีเมลของคุณเพื่อเข้าสู่ระบบ</p>`;
  }

  async sendForgotPasswordEmail(
    email: string,
    aggregateId: string,
    resetLink: string,
  ): Promise<void> {
    await this.emailService.send({
      to: email,
      subject: 'รีเซ็ตรหัสผ่าน',
      templateId: 'reset-password',
      html: this.resetPasswordTemplate(resetLink),
      variables: { userId: aggregateId, email: email },
    });
  }
  private resetPasswordTemplate(resetLink: string): string {
    return `<h1>รีเซ็ตรหัสผ่าน ${resetLink}</h1><p>กรุณารีเซ็ตรหัสผ่านของคุณ</p>`;
  }
}
