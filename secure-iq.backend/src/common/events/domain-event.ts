export abstract class DomainEvent {
  public readonly occurredAt: Date;
  public readonly eventId: string;

  constructor(public readonly aggregateId: string) {
    this.occurredAt = new Date();
    this.eventId = crypto.randomUUID();
  }

  // ชื่อ event ใช้สำหรับ routing (Kafka topic, EventBus, ฯลฯ)
  abstract get eventName(): string;
}
