import { EmailVerificationTokenEntity } from './email-verification-token.entity';

// auth/domain/repositories/email-verification-token.repository.interface.ts
export const EMAIL_VERIFICATION_TOKEN_REPOSITORY = Symbol(
  'EMAIL_VERIFICATION_TOKEN_REPOSITORY',
);

export interface IEmailVerificationTokenRepository {
  findByTokenHash(hash: string): Promise<EmailVerificationTokenEntity | null>;
  findPendingByUserId(
    userId: string,
  ): Promise<EmailVerificationTokenEntity | null>;
  save(token: EmailVerificationTokenEntity): Promise<void>;
  update(token: EmailVerificationTokenEntity): Promise<void>;
  // invalidate token เก่าทั้งหมดก่อนออกอันใหม่
  invalidateAllByUserId(userId: string): Promise<void>;
}
