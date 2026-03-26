import { IClock } from '../../../../common/clock/clock.port';
import { UserNotFoundException } from '../../../user/domain/exceptions/user-not-found.exception';
import { IUserRepository } from '../../../user/domain/user.repository';
import { IEmailVerificationTokenRepository } from '../../domain/email-verification-token.repository.interface';
import { InvalidTokenException } from '../../domain/exceptions/invalid-token.exception';
import { ITokenService } from '../../../../shared/ports/token-service.port';
import { VerifyEmailCommand } from './verify-email.command';

// auth/application/use-cases/verify-email/verify-email.use-case.ts
export class VerifyEmailUseCase {
  constructor(
    private readonly verificationTokenRepository: IEmailVerificationTokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly clock: IClock,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<void> {
    const tokenHash = this.tokenService.hashToken(command.token);
    const now = this.clock.now();

    // ── หา token ──────────────────────────────────────────────────
    const verificationToken =
      await this.verificationTokenRepository.findByTokenHash(tokenHash);

    if (!verificationToken || !verificationToken.isValid(now)) {
      throw new InvalidTokenException();
    }

    // ── หา User ───────────────────────────────────────────────────
    const user = await this.userRepository.findById(verificationToken.userId);
    if (!user) throw new UserNotFoundException(verificationToken.userId);

    // ── Activate User ─────────────────────────────────────────────
    user.activate(now);

    // ── Mark token ว่าใช้แล้ว ─────────────────────────────────────
    verificationToken.markAsUsed();

    await this.userRepository.update(user);
    await this.verificationTokenRepository.update(verificationToken);
  }
}
