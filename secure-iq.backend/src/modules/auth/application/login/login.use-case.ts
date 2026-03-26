import { IUserRepository } from '../../../user/domain/user.repository';
import { IPasswordService } from '../../../../shared/ports/IPasswordService';
import { ITokenService } from '../../../../shared/ports/token-service.port';
import { LoginCommand } from './login.command';

export class LoginUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.email) {
      throw new Error('Email address has not been verified');
    }

    const isPasswordValid = await this.passwordService.compare(
      command.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
    });
  }
}
