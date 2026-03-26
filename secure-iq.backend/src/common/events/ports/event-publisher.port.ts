import { DomainEvent } from '../domain-event';

// event-publisher.port.ts
export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER');
export interface IEventPublisher {
  publishAll(events: DomainEvent[]): Promise<void>;
}
