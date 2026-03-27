import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { LoginCommand } from '../application/login/login.command';
import { LoginUsecase } from '../application/login/login.use-case';
import { ResendVerificationUseCase } from '../application/resend-verification/resend-verification.use-case';
import { VerifyEmailCommand } from '../application/verify-email/verify-email.command';
import { VerifyEmailUseCase } from '../application/verify-email/verify-email.use-case';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly resendVerificationUseCase: ResendVerificationUseCase,
    private readonly loginUseCase: LoginUsecase,
  ) {}

  @Get('verify-email')
  async verifyEmail(@Query() query: VerifyEmailDto) {
    return this.verifyEmailUseCase.execute(new VerifyEmailCommand(query.token));
  }

  @Post('resend-verification')
  async resendVerification(@Body() body: { email: string }) {
    return this.resendVerificationUseCase.execute({ email: body.email });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.loginUseCase.execute(
      new LoginCommand(loginDto.email, loginDto.password),
    );
    return { message: 'Login successful', token };
  }

  @Get('me')
  async me() {
    return { message: 'User info' };
  }
}
