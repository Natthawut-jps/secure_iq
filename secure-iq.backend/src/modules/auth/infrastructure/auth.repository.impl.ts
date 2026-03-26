import { Injectable } from '@nestjs/common';
import { IEmailVerificationTokenRepository } from '../domain/email-verification-token.repository.interface';
import { EmailVerificationTokenEntity } from '../domain/email-verification-token.entity';
import { PrismaService } from '../../../prisma.service';
import { EmailVerificationToken } from '../../../generated/prisma/client';

@Injectable()
export class PrismaAuthRepository implements IEmailVerificationTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByTokenHash(
    hash: string,
  ): Promise<EmailVerificationTokenEntity | null> {
    const record = await this.prisma.emailVerificationToken.findUnique({
      where: { token_hash: hash },
    });
    return record ? this.toDomain(record) : null;
  }
  async findPendingByUserId(
    userId: string,
  ): Promise<EmailVerificationTokenEntity | null> {
    const record = await this.prisma.emailVerificationToken.findFirst({
      where: { user_id: userId, is_used: false },
    });
    return record ? this.toDomain(record) : null;
  }
  async save(token: EmailVerificationTokenEntity): Promise<void> {
    const persistenceData = this.toPersistence(token);
    await this.prisma.emailVerificationToken.create({
      data: persistenceData,
    });
  }
  async update(token: EmailVerificationTokenEntity): Promise<void> {
    const persistenceData = this.toPersistence(token);
    await this.prisma.emailVerificationToken.update({
      where: { id: token.id },
      data: persistenceData,
    });
  }
  async invalidateAllByUserId(userId: string): Promise<void> {
    await this.prisma.emailVerificationToken.updateMany({
      where: { user_id: userId, is_used: false },
      data: { is_used: true },
    });
  }

  // ── Mapper ───────────────────────────────────────────────────────
  private toDomain(
    record: EmailVerificationToken,
  ): EmailVerificationTokenEntity {
    return EmailVerificationTokenEntity.reconstitute({
      id: record.id,
      userId: record.user_id,
      email: record.email,
      tokenHash: record.token_hash,
      isUsed: record.is_used,
      createdAt: record.created_at,
      expiresAt: record.expires_at,
    });
  }

  private toPersistence(
    auth: EmailVerificationTokenEntity,
  ): EmailVerificationToken {
    return {
      id: auth.id,
      user_id: auth.userId,
      email: auth.email.value,
      token_hash: auth.tokenHash,
      is_used: auth.isUsed,
      created_at: auth.createdAt,
      expires_at: auth.expiresAt,
    };
  }
}
