// application/ports/email.service.port.ts
export const EMAIL_SENDER = Symbol('EMAIL_SENDER');
export interface IEmailSender {
  send(options: EmailOptions): Promise<void>;
}
export interface EmailOptions {
  to: string;
  subject: string;
  templateId: string;
  html: string;
  variables: Record<string, unknown>;
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}
