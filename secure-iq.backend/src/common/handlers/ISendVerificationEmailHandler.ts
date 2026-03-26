export const SEND_VERIFICATION_EMAIL_HANDLER = Symbol(
  'SEND_VERIFICATION_EMAIL_HANDLER',
);
export interface ISendVerificationEmailHandler {
  handle(data: { email: string; userId: string }): Promise<void>;
}
