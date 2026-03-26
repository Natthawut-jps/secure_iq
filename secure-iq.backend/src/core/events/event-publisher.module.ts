import { forwardRef, Module } from '@nestjs/common';
import { EVENT_PUBLISHER } from '../../common/events/ports/event-publisher.port';
import { LocalEventPublisher } from './local-event-publisher';
import { AuthModule } from '../../modules/auth/auth.module';
import {
  ISendVerificationEmailHandler,
  SEND_VERIFICATION_EMAIL_HANDLER,
} from '../../common/handlers/ISendVerificationEmailHandler';
import {
  ISendForgotPasswordHandler,
  SEND_FORGOT_PASSWORD_HANDLER,
} from '../../common/handlers/ISendForgotPasswordHandler';

// infrastructure/events/event-publisher.module.ts
@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [
    {
      provide: EVENT_PUBLISHER,
      useFactory: (
        forgotHandler: ISendForgotPasswordHandler,
        verificationHandler: ISendVerificationEmailHandler,
      ) => new LocalEventPublisher(forgotHandler, verificationHandler),
      inject: [SEND_FORGOT_PASSWORD_HANDLER, SEND_VERIFICATION_EMAIL_HANDLER],
    },
  ],
  exports: [EVENT_PUBLISHER],
})
export class EventPublisherModule {}
