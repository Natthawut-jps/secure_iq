// auth/application/use-cases/resend-verification/resend-verification.command.ts
export class ResendVerificationCommand {
  constructor(public readonly email: string) {}
}
