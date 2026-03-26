import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { UserEntity, UserStatus } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../../../generated/prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const record = await this.prisma.user.findUnique({
      where: { id },
    });
    return record ? this.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.prisma.user.findUnique({
      where: { email },
    });
    return record ? this.toDomain(record) : null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user !== null;
  }

  async activeByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user?.status === UserStatus.ACTIVE;
  }

  async save(user: UserEntity): Promise<void> {
    const persistenceData = this.toPersistence(user);
    await this.prisma.user.create({
      data: {
        id: persistenceData.id,
        name: persistenceData.name,
        email: persistenceData.email,
        password: persistenceData.password,
        status: persistenceData.status,
        version: persistenceData.version,
        created_at: persistenceData.created_at,
        updated_at: persistenceData.updated_at,
      },
    });
  }

  async update(user: UserEntity): Promise<void> {
    const persistenceData = this.toPersistence(user);
    await this.prisma.user.update({
      where: { id: persistenceData.id },
      data: {
        name: persistenceData.name,
        email: persistenceData.email,
        password: persistenceData.password,
        status: persistenceData.status,
        version: persistenceData.version,
        created_at: persistenceData.created_at,
        updated_at: persistenceData.updated_at,
      },
    });
  }

  // ── Mapper ───────────────────────────────────────────────────────
  private toDomain(record: User): UserEntity {
    return UserEntity.reconstitute({
      id: record.id,
      name: record.name,
      email: record.email,
      hashedPassword: record.password,
      status: record.status as UserStatus,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      version: record.version,
    });
  }

  private toPersistence(user: UserEntity): User {
    const persistenceData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.passwordHash,
      status: user.status,
      version: user.version,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
    return persistenceData;
  }
}
