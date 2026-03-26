// auth/domain/entities/reset-password-token.entity.ts
export class ResetPasswordToken {
  private constructor(
    public readonly id: string,
    public readonly tokenHash: string,
    private _userId: string,
    private _isUsed: boolean = false,
    public readonly createdAt: Date,
    public readonly expiredAt: Date,
  ) {}

  static create(
    id: string,
    tokenHash: string,
    userId: string,
    createdAt: Date,
    expiredAt: Date,
  ): ResetPasswordToken {
    return new ResetPasswordToken(
      id,
      tokenHash,
      userId,
      false,
      createdAt,
      expiredAt,
    );
  }

  static reconstitute(
    id: string,
    tokenHash: string,
    userId: string,
    isUsed: boolean = false,
    createdAt: Date,
    expiredAt: Date,
  ): ResetPasswordToken {
    return new ResetPasswordToken(
      id,
      tokenHash,
      userId,
      isUsed,
      createdAt,
      expiredAt,
    );
  }

  isExpired(): boolean {
    return new Date() > this.expiredAt;
  }

  isValid(): boolean {
    return !this._isUsed && !this.isExpired();
  }

  get userId(): string {
    return this._userId;
  }

  get isUsed(): boolean {
    return this._isUsed;
  }

  use(): void {
    this._isUsed = true;
  }
}
