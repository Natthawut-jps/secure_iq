import { DomainEvent } from '../../common/events/domain-event';
import { IEventPublisher } from '../../common/events/ports/event-publisher.port';
import { ISendForgotPasswordHandler } from '../../common/handlers/ISendForgotPasswordHandler';
import { ISendVerificationEmailHandler } from '../../common/handlers/ISendVerificationEmailHandler';
import { ForgotPasswordEvent } from '../../modules/user/domain/events/forgot-password.event';
import { UserCreatedEvent } from '../../modules/user/domain/events/user-created.event';

export class LocalEventPublisher implements IEventPublisher {
  constructor(
    private readonly sendForgotPasswordHandler: ISendForgotPasswordHandler,
    private readonly sendVerifyEmailHandler: ISendVerificationEmailHandler,
  ) {}

  async publishAll(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.route(event);
    }
  }

  private async route(event: DomainEvent): Promise<void> {
    switch (event.eventName) {
      case 'user.created':
        await this.sendVerifyEmailHandler.handle({
          email: (event as UserCreatedEvent).email,
          userId: event.aggregateId,
        });
        break;
      case 'auth.password_reset_requested':
        await this.sendForgotPasswordHandler.handle({
          email: (event as ForgotPasswordEvent).email,
          userId: event.aggregateId,
        });
        break;
    }
  }
}
