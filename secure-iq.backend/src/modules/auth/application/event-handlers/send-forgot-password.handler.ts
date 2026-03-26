import { IClock } from '../../../../common/clock/clock.port';
import { IIdGenerator } from '../../../../common/id/id.generator';
import { IResetPasswordTokenRepository } from '../../domain/reset-password-token.repository';
import { ResetPasswordToken } from '../../domain/reset-password-token.entity';
import { IAuthEmailService } from '../ports/auth-email.service.port';
import { ITokenService } from '../../../../shared/ports/token-service.port';

export class SendForgotPasswordHandler {
  private readonly TOKEN_TTL_MINUTES = 15;

  constructor(
    private readonly idGenerator: IIdGenerator,
    private readonly clock: IClock,
    private readonly resetPasswordTokenRepository: IResetPasswordTokenRepository,
    private readonly authEmailService: IAuthEmailService,
    private readonly tokenService: ITokenService,
  ) {}

  async handle({
    email,
    userId,
  }: {
    email: string;
    userId: string;
  }): Promise<void> {
    // invalidate token เก่าก่อน
    await this.resetPasswordTokenRepository.invalidateAllByUserId(userId);
    const rawToken = this.tokenService.generateRefreshToken();
    const tokenHash = this.tokenService.hashToken(rawToken);
    const now = this.clock.now();

    // สร้าง token ใหม่
    const token = ResetPasswordToken.create(
      this.idGenerator.generate(),
      tokenHash,
      userId,
      now,
      new Date(now.getTime() + 1000 * 60 * 60),
    );

    await this.resetPasswordTokenRepository.save(token);

    const verifyLink = `${process.env.APP_URL}/auth/verify?token=${rawToken}`;

    await this.authEmailService.sendForgotPasswordEmail(
      email,
      userId,
      verifyLink,
    );
  }
}
