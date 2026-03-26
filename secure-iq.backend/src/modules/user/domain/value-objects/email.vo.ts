export class Email {
  private readonly value: string;

  constructor(email: string) {
    const normalized = email.trim().toLowerCase();
    if (!this.isValid(normalized)) {
      throw new Error('Invalid email format');
    }
    this.value = normalized;
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toString(): string {
    return this.value;
  }
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
