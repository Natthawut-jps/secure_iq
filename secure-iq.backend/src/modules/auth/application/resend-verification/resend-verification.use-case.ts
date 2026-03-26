import { IClock } from '../../../../common/clock/clock.port';
import { IIdGenerator } from '../../../../common/id/id.generator';
import { IUserRepository } from '../../../user/domain/user.repository';
import { EmailVerificationTokenEntity } from '../../domain/email-verification-token.entity';
import { IEmailVerificationTokenRepository } from '../../domain/email-verification-token.repository.interface';
import { IAuthEmailService } from '../ports/auth-email.service.port';
import { ITokenService } from '../../../../shared/ports/token-service.port';
import { ResendVerificationCommand } from './resend-verification.command';

// auth/application/use-cases/resend-verification/resend-verification.use-case.ts
export class ResendVerificationUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly verificationTokenRepository: IEmailVerificationTokenRepository,
    private readonly authEmailService: IAuthEmailService,
    private readonly tokenService: ITokenService,
    private readonly idGenerator: IIdGenerator,
    private readonly clock: IClock,
  ) {}

  async execute(command: ResendVerificationCommand): Promise<void> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) return;

    await this.verificationTokenRepository.invalidateAllByUserId(user.id);

    const rawToken = this.tokenService.generateRefreshToken();
    const tokenHash = this.tokenService.hashToken(rawToken);
    const now = this.clock.now();

    const newToken = EmailVerificationTokenEntity.create({
      id: this.idGenerator.generate(),
      userId: user.id,
      email: user.email,
      tokenHash,
      now,
      ttlMinutes: 15,
    });

    await this.verificationTokenRepository.save(newToken);

    const verifyLink = `${process.env.APP_URL}/auth/verify?token=${rawToken}`;
    await this.authEmailService.sendVerificationEmail(
      user.email,
      user.id,
      verifyLink,
    );
  }
}
