// domain/events/user-password-changed.event.ts
import { DomainEvent } from '../../../../common/events/domain-event';

export class UserPasswordChangedEvent extends DomainEvent {
  constructor(aggregateId: string) {
    super(aggregateId);
  }

  get eventName(): string {
    return 'user.password_changed';
  }
}
