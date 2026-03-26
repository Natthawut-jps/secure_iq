import { TokenAlreadyUsedException } from './exceptions/token-already-used.exception';
import { Email } from './value-object/email.vo';

// auth/domain/entities/email-verification-token.entity.ts
export class EmailVerificationTokenEntity {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly email: Email,
    private _tokenHash: string,
    private _isUsed: boolean,
    public readonly createdAt: Date,
    public readonly expiresAt: Date,
  ) {}

  static create(props: {
    id: string;
    userId: string;
    email: string;
    tokenHash: string;
    now: Date;
    ttlMinutes: number;
  }): EmailVerificationTokenEntity {
    const expiresAt = new Date(props.now);
    expiresAt.setMinutes(expiresAt.getMinutes() + props.ttlMinutes);

    return new EmailVerificationTokenEntity(
      props.id,
      props.userId,
      Email.create(props.email),
      props.tokenHash,
      false,
      props.now,
      expiresAt,
    );
  }

  static reconstitute(props: {
    id: string;
    userId: string;
    email: string;
    tokenHash: string;
    isUsed: boolean;
    createdAt: Date;
    expiresAt: Date;
  }): EmailVerificationTokenEntity {
    return new EmailVerificationTokenEntity(
      props.id,
      props.userId,
      Email.create(props.email),
      props.tokenHash,
      props.isUsed,
      props.createdAt,
      props.expiresAt,
    );
  }

  isExpired(now: Date): boolean {
    return now > this.expiresAt;
  }
  isValid(now: Date): boolean {
    return !this._isUsed && !this.isExpired(now);
  }

  markAsUsed(): void {
    if (this._isUsed) throw new TokenAlreadyUsedException();
    this._isUsed = true;
  }

  get tokenHash(): string {
    return this._tokenHash;
  }
  get isUsed(): boolean {
    return this._isUsed;
  }
}
