// domain/events/user-updated.event.ts
import { DomainEvent } from '../../../../common/events/domain-event';

export class UserUpdatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly changes: Record<string, unknown>,
  ) {
    super(aggregateId);
  }

  get eventName(): string {
    return 'user.updated';
  }
}
