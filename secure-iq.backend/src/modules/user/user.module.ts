import { Module } from '@nestjs/common';
import { CLOCK, IClock, SystemClock } from '../../common/clock/clock.port';
import {
  EVENT_PUBLISHER,
  IEventPublisher,
} from '../../common/events/ports/event-publisher.port';
import {
  ID_GENERATOR,
  IIdGenerator,
  UuidV7Generator,
} from '../../common/id/id.generator';
import { EventPublisherModule } from '../../core/events/event-publisher.module';
import {
  IPasswordService,
  PASSWORD_SERVICE,
} from '../../shared/ports/IPasswordService';
import { SharedModule } from '../../shared/shared.module';
import { CreateUserUseCase } from './application/create-user.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { IUserRepository, USER_REPOSITORY } from './domain/user.repository';
import { UserRepository } from './infrastructure/user.repository.impl';
import { UserController } from './presentation/user.controller';
import { ForgotPasswordUsecase } from './application/forgot-password/forgot-password.use-case';

@Module({
  imports: [EventPublisherModule, SharedModule],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: CLOCK, useClass: SystemClock },
    { provide: ID_GENERATOR, useClass: UuidV7Generator },
    {
      provide: ForgotPasswordUsecase,
      useFactory: (
        userRepository: IUserRepository,
        eventPublisher: IEventPublisher,
      ) => new ForgotPasswordUsecase(userRepository, eventPublisher),
      inject: [USER_REPOSITORY, EVENT_PUBLISHER],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        eventPublisher: IEventPublisher,
        idGenerator: IIdGenerator,
        clock: IClock,
        passwordService: IPasswordService,
      ) =>
        new CreateUserUseCase(
          userRepository,
          eventPublisher,
          idGenerator,
          clock,
          passwordService,
        ),
      inject: [
        USER_REPOSITORY,
        EVENT_PUBLISHER,
        ID_GENERATOR,
        CLOCK,
        PASSWORD_SERVICE,
      ],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        eventPublisher: IEventPublisher,
        clock: IClock,
      ) => new UpdateUserUseCase(userRepository, eventPublisher, clock),
      inject: [USER_REPOSITORY, EVENT_PUBLISHER, CLOCK],
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
