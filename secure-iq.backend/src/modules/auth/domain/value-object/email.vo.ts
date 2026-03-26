export class Email {
  private constructor(private readonly email: string) {}

  static create(email: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      throw new Error('Email is required');
    }
    if (!normalizedEmail.match(emailRegex)) {
      throw new Error('Email is invalid');
    }
    return new Email(normalizedEmail);
  }

  get value(): string {
    return this.email;
  }
}
