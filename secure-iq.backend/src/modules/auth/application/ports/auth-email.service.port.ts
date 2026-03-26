// auth/application/ports/auth-email.service.port.ts
export const AUTH_EMAIL_SERVICE = Symbol('AUTH_EMAIL_SERVICE');
export interface IAuthEmailService {
  sendVerificationEmail(
    to: string,
    aggregateId: string,
    verifyLink: string,
  ): Promise<void>;

  sendForgotPasswordEmail(
    to: string,
    aggregateId: string,
    resetLink: string,
  ): Promise<void>;
}
