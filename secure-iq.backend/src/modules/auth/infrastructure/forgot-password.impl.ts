import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { IResetPasswordTokenRepository } from '../domain/reset-password-token.repository';
import { ResetPasswordToken as PrismaResetPasswordToken } from '../../../generated/prisma/client';
import { ResetPasswordToken } from '../domain/reset-password-token.entity';

@Injectable()
export class ForgotPasswordImpl implements IResetPasswordTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByTokenHash(hash: string): Promise<ResetPasswordToken | null> {
    const record = await this.prisma.resetPasswordToken.findUnique({
      where: { token_hash: hash },
    });
    return record ? this.toDomain(record) : null;
  }
  async save(token: ResetPasswordToken): Promise<void> {
    const persistenceData = this.toPersistence(token);
    await this.prisma.resetPasswordToken.create({
      data: persistenceData,
    });
  }

  async invalidateAllByUserId(userId: string): Promise<void> {
    await this.prisma.resetPasswordToken.updateMany({
      where: { user_id: userId, is_used: false },
      data: { is_used: true },
    });
  }
  // ── Mapper ───────────────────────────────────────────────────────
  private toDomain(record: PrismaResetPasswordToken): ResetPasswordToken {
    return ResetPasswordToken.reconstitute(
      record.id,
      record.token_hash,
      record.user_id,
      record.is_used,
      record.created_at,
      record.expires_at,
    );
  }
  private toPersistence(auth: ResetPasswordToken): PrismaResetPasswordToken {
    return {
      id: auth.id,
      user_id: auth.userId,
      token_hash: auth.tokenHash,
      is_used: auth.isUsed,
      created_at: auth.createdAt,
      expires_at: auth.expiredAt,
    };
  }
}
