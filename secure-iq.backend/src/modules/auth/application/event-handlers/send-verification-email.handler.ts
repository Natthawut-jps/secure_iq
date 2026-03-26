import { IClock } from '../../../../common/clock/clock.port';
import { IIdGenerator } from '../../../../common/id/id.generator';
import { EmailVerificationTokenEntity } from '../../domain/email-verification-token.entity';
import { IEmailVerificationTokenRepository } from '../../domain/email-verification-token.repository.interface';
import { IAuthEmailService } from '../ports/auth-email.service.port';
import { ITokenService } from '../../../../shared/ports/token-service.port';

// auth/application/event-handlers/send-verification-email.handler.ts
export class SendVerificationEmailHandler {
  private readonly TOKEN_TTL_MINUTES = 15;

  constructor(
    private readonly verificationTokenRepository: IEmailVerificationTokenRepository,
    private readonly authEmailService: IAuthEmailService,
    private readonly tokenService: ITokenService,
    private readonly idGenerator: IIdGenerator,
    private readonly clock: IClock,
  ) {}

  async handle({
    email,
    userId,
  }: {
    email: string;
    userId: string;
  }): Promise<void> {
    // invalidate token เก่า (กรณี resend)
    await this.verificationTokenRepository.invalidateAllByUserId(userId);

    // สร้าง raw token
    const rawToken = this.tokenService.generateRefreshToken();
    const tokenHash = this.tokenService.hashToken(rawToken);
    const now = this.clock.now();

    const verificationToken = EmailVerificationTokenEntity.create({
      id: this.idGenerator.generate(),
      userId,
      email,
      tokenHash,
      now,
      ttlMinutes: this.TOKEN_TTL_MINUTES,
    });

    await this.verificationTokenRepository.save(verificationToken);

    const verifyLink = `${process.env.APP_URL}/auth/verify?token=${rawToken}`;

    await this.authEmailService.sendVerificationEmail(
      email,
      userId,
      verifyLink,
    );
  }
}
