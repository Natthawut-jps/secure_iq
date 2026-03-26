import { UserEntity } from './user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  existsByEmail(email: string): Promise<boolean>;
  save(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  activeByEmail(email: string): Promise<boolean>;
}
