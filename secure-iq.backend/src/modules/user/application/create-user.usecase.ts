import { IClock } from '../../../common/clock/clock.port';
import { IEventPublisher } from '../../../common/events/ports/event-publisher.port';
import { IIdGenerator } from '../../../common/id/id.generator';
import { IPasswordService } from '../../../shared/ports/IPasswordService';
import { UserAlreadyExistsException } from '../domain/exceptions/user-already-exists.exception';
import { UserEntity } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository';
import { CreateUserCommand } from './dto/create-user/create-user.command';
import { CreateUserResult } from './dto/create-user/create-user.result';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventPublisher: IEventPublisher,
    private readonly idGenerator: IIdGenerator,
    private readonly clock: IClock,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResult> {
    const emailTaken = await this.userRepository.existsByEmail(command.email);
    if (emailTaken) throw new UserAlreadyExistsException(command.email);

    const hashedPassword = await this.passwordService.hash(command.password);

    const user = UserEntity.create({
      id: this.idGenerator.generate(),
      name: command.name,
      email: command.email,
      hashedPassword,
      now: this.clock.now(),
    });

    await this.userRepository.save(user);
    await this.eventPublisher.publishAll(user.domainEvents);
    user.clearDomainEvents();

    return new CreateUserResult(
      user.id,
      user.name,
      user.email,
      user.status,
      user.createdAt,
      // ← ไม่มี password ใน result เด็ดขาด
    );
  }
}
