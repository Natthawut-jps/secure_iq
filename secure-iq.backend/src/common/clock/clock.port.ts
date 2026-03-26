export const CLOCK = Symbol('CLOCK');

export interface IClock {
  now(): Date;
}

export class SystemClock implements IClock {
  now(): Date {
    return new Date();
  }
}

// ใช้ใน test เพื่อควบคุมเวลา
export class FixedClock implements IClock {
  constructor(private readonly fixedTime: Date) {}
  now(): Date {
    return this.fixedTime;
  }
}
