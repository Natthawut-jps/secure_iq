import { forwardRef, Module } from '@nestjs/common';
import { CLOCK, IClock, SystemClock } from '../../common/clock/clock.port';
import {
  EMAIL_SENDER,
  IEmailSender,
} from '../../common/emails/email-sender.port';
import { EmailModule } from '../../common/emails/nodemailler.module';
import { SEND_FORGOT_PASSWORD_HANDLER } from '../../common/handlers/ISendForgotPasswordHandler';
import { SEND_VERIFICATION_EMAIL_HANDLER } from '../../common/handlers/ISendVerificationEmailHandler';
import {
  ID_GENERATOR,
  IIdGenerator,
  UuidV7Generator,
} from '../../common/id/id.generator';
import { EventPublisherModule } from '../../core/events/event-publisher.module';
import {
  IPasswordService,
  PASSWORD_SERVICE,
} from '../../shared/ports/IPasswordService';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '../../shared/ports/token-service.port';
import { SharedModule } from '../../shared/shared.module';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../user/domain/user.repository';
import { UserModule } from '../user/user.module';
import { SendForgotPasswordHandler } from './application/event-handlers/send-forgot-password.handler';
import { SendVerificationEmailHandler } from './application/event-handlers/send-verification-email.handler';
import { LoginUsecase } from './application/login/login.use-case';
import {
  AUTH_EMAIL_SERVICE,
  IAuthEmailService,
} from './application/ports/auth-email.service.port';
import { ResendVerificationUseCase } from './application/resend-verification/resend-verification.use-case';
import { VerifyEmailUseCase } from './application/verify-email/verify-email.use-case';
import {
  EMAIL_VERIFICATION_TOKEN_REPOSITORY,
  IEmailVerificationTokenRepository,
} from './domain/email-verification-token.repository.interface';
import {
  IResetPasswordTokenRepository,
  RESET_PASSWORD_TOKEN_REPOSITORY,
} from './domain/reset-password-token.repository';
import { PrismaAuthRepository } from './infrastructure/auth.repository.impl';
import { AuthEmailService } from './infrastructure/email/auth-email-service';
import { ForgotPasswordImpl } from './infrastructure/forgot-password.impl';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [
    forwardRef(() => EventPublisherModule),
    forwardRef(() => UserModule),
    EmailModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: EMAIL_VERIFICATION_TOKEN_REPOSITORY,
      useClass: PrismaAuthRepository,
    },
    {
      provide: CLOCK,
      useClass: SystemClock,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidV7Generator,
    },
    {
      provide: RESET_PASSWORD_TOKEN_REPOSITORY,
      useClass: ForgotPasswordImpl,
    },
    {
      provide: AUTH_EMAIL_SERVICE,
      useFactory: (emailSender: IEmailSender) => {
        return new AuthEmailService(emailSender);
      },
      inject: [EMAIL_SENDER],
    },
    {
      provide: VerifyEmailUseCase,
      useFactory: (
        verificationTokenRepository: IEmailVerificationTokenRepository,
        userRepository: IUserRepository,
        tokenService: ITokenService,
        clock: IClock,
      ) => {
        return new VerifyEmailUseCase(
          verificationTokenRepository,
          userRepository,
          tokenService,
          clock,
        );
      },
      inject: [
        EMAIL_VERIFICATION_TOKEN_REPOSITORY,
        USER_REPOSITORY,
        TOKEN_SERVICE,
        CLOCK,
      ],
    },
    {
      provide: SEND_VERIFICATION_EMAIL_HANDLER,
      useFactory: (
        verificationTokenRepository: IEmailVerificationTokenRepository,
        authEmailService: IAuthEmailService,
        tokenService: ITokenService,
        idGenerator: IIdGenerator,
        clock: IClock,
      ) => {
        return new SendVerificationEmailHandler(
          verificationTokenRepository,
          authEmailService,
          tokenService,
          idGenerator,
          clock,
        );
      },
      inject: [
        EMAIL_VERIFICATION_TOKEN_REPOSITORY,
        AUTH_EMAIL_SERVICE,
        TOKEN_SERVICE,
        ID_GENERATOR,
        CLOCK,
      ],
    },
    {
      provide: ResendVerificationUseCase,
      useFactory: (
        userRepository: IUserRepository,
        verificationTokenRepository: IEmailVerificationTokenRepository,
        authEmailService: IAuthEmailService,
        tokenService: ITokenService,
        idGenerator: IIdGenerator,
        clock: IClock,
      ) => {
        return new ResendVerificationUseCase(
          userRepository,
          verificationTokenRepository,
          authEmailService,
          tokenService,
          idGenerator,
          clock,
        );
      },
      inject: [
        USER_REPOSITORY,
        EMAIL_VERIFICATION_TOKEN_REPOSITORY,
        AUTH_EMAIL_SERVICE,
        TOKEN_SERVICE,
        ID_GENERATOR,
        CLOCK,
      ],
    },
    {
      provide: LoginUsecase,
      useFactory: (
        userRepository: IUserRepository,
        tokenService: ITokenService,
        passwordService: IPasswordService,
      ) => {
        return new LoginUsecase(userRepository, tokenService, passwordService);
      },
      inject: [USER_REPOSITORY, TOKEN_SERVICE, PASSWORD_SERVICE],
    },
    {
      provide: SEND_FORGOT_PASSWORD_HANDLER,
      useFactory: (
        idGenerator: IIdGenerator,
        clock: IClock,
        resetPasswordTokenRepository: IResetPasswordTokenRepository,
        authEmailService: IAuthEmailService,
        tokenService: ITokenService,
      ) => {
        return new SendForgotPasswordHandler(
          idGenerator,
          clock,
          resetPasswordTokenRepository,
          authEmailService,
          tokenService,
        );
      },
      inject: [
        ID_GENERATOR,
        CLOCK,
        RESET_PASSWORD_TOKEN_REPOSITORY,
        AUTH_EMAIL_SERVICE,
        TOKEN_SERVICE,
      ],
    },
  ],
  exports: [SEND_FORGOT_PASSWORD_HANDLER, SEND_VERIFICATION_EMAIL_HANDLER],
})
export class AuthModule {}
