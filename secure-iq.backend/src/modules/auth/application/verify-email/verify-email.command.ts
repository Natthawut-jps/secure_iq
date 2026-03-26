// auth/application/use-cases/verify-email/verify-email.command.ts
export class VerifyEmailCommand {
  constructor(public readonly token: string) {}
}
