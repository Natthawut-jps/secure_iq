import { AggregateRoot } from '../../../common/events/aggregate-root';
import { ForgotPasswordEvent } from './events/forgot-password.event';
import { UserCreatedEvent } from './events/user-created.event';
import { UserPasswordChangedEvent } from './events/user-password-changed.event';
import { UserUpdatedEvent } from './events/user-updated.event';
import { UserBannedException } from './exceptions/user-banned.exception';
import { Email } from './value-objects/email.vo';
import { HashedPassword } from './value-objects/hashed-password.vo';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

export class UserEntity extends AggregateRoot {
  private constructor(
    public readonly id: string,
    private _name: string,
    private _email: Email,
    private _password: HashedPassword,
    private _status: UserStatus,
    public readonly createdAt: Date,
    private _updatedAt: Date,
    private _version: number,
  ) {
    super();
  }

  // ── สร้าง User ใหม่ ──────────────────────────────────────────────
  static create(props: {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    now: Date;
  }): UserEntity {
    const user = new UserEntity(
      props.id,
      props.name,
      new Email(props.email),
      HashedPassword.fromHash(props.hashedPassword),
      UserStatus.PENDING,
      props.now,
      props.now,
      0,
    );

    user.addDomainEvent(new UserCreatedEvent(user.id, user.email));
    return user;
  }

  // ── โหลดจาก DB ──────────────────────────────────────────────────
  static reconstitute(props: {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): UserEntity {
    return new UserEntity(
      props.id,
      props.name,
      new Email(props.email),
      HashedPassword.fromHash(props.hashedPassword),
      props.status,
      props.createdAt,
      props.updatedAt,
      props.version,
    );
  }

  // ── Business Methods ─────────────────────────────────────────────
  updateProfile(
    props: { name?: string; email?: string },
    now: Date,
  ): void {
    if (this._status === UserStatus.BANNED) {
      throw new UserBannedException(this.id);
    }

    const changes: Record<string, unknown> = {};

    if (props.name) {
      if (props.name !== this._name) {
        this._name = props.name;
        changes.name = props.name;
      }
    }

    if (props.email) {
      const newEmail = new Email(props.email);
      if (!newEmail.equals(this._email)) {
        this._email = newEmail;
        changes.email = props.email;
      }
    }

    if (props.email) {
      const newEmail = new Email(props.email);
      if (!newEmail.equals(this._email)) {
        this._email = newEmail;
        changes.email = props.email;
      }
    }

    if (Object.keys(changes).length === 0) return;

    this._updatedAt = now;
    this._version += 1;
    this.addDomainEvent(new UserUpdatedEvent(this.id, changes));
  }

  changePassword(newHashedPassword: string, now: Date): void {
    if (this._status === UserStatus.BANNED) {
      throw new UserBannedException(this.id);
    }
    this._password = HashedPassword.fromHash(newHashedPassword);
    this._updatedAt = now;
    this._version += 1;
    this.addDomainEvent(new UserPasswordChangedEvent(this.id));
  }

  requestPasswordReset(): void {
    this.addDomainEvent(
      new ForgotPasswordEvent(this.id, this._email.toString()),
    );
  }

  deactivate(now: Date): void {
    if (this._status !== UserStatus.ACTIVE) return;
    this._updatedAt = now;
    this._version += 1;
    this._status = UserStatus.BANNED;
  }

  activate(now: Date): void {
    if (this._status !== UserStatus.PENDING) return;
    this._updatedAt = now;
    this._version += 1;
    this._status = UserStatus.ACTIVE;
  }

  // ── Getters ──────────────────────────────────────────────────────
  get  name(): string {
    return this._name;
  }
  get email(): string {
    return this._email.toString();
  }
  get passwordHash(): string {
    return this._password.toString();
  }
  get status(): UserStatus {
    return this._status;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get version(): number {
    return this._version;
  }
}
