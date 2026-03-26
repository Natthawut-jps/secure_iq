// common/events/handlers/ISendForgotPasswordHandler.ts
export const SEND_FORGOT_PASSWORD_HANDLER = Symbol(
  'SEND_FORGOT_PASSWORD_HANDLER',
);
export interface ISendForgotPasswordHandler {
  handle(data: { email: string; userId: string }): Promise<void>;
}
