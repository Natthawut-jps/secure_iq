// domain/events/user-created.event.ts
import { DomainEvent } from '../../../../common/events/domain-event';

export class UserCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly email: string,
  ) {
    super(aggregateId);
  }

  get eventName(): string {
    return 'user.created';
  }
}
