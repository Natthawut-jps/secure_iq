import { ResetPasswordToken } from './reset-password-token.entity';

// auth/domain/ports/reset-password-token.repository.ts
export const RESET_PASSWORD_TOKEN_REPOSITORY = Symbol(
  'RESET_PASSWORD_TOKEN_REPOSITORY',
);
export interface IResetPasswordTokenRepository {
  save(token: ResetPasswordToken): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<ResetPasswordToken | null>;
  invalidateAllByUserId(userId: string): Promise<void>;
}
