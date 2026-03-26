import { DomainEvent } from '../../../../common/events/domain-event';

export class ForgotPasswordEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly email: string,
  ) {
    super(aggregateId);
  }

  get eventName(): string {
    return 'auth.password_reset_requested';
  }
}
