import { IUserRepository } from '../domain/user.repository';
import { IPasswordHasher } from './ports/password-hasher.port';
import { ChangePasswordCommand } from './dto/change-password/change-password.command';
import { IClock } from '../../../common/clock/clock.port';
import { ChangePasswordResult } from './dto/change-password/change-password.result';
import { IEventPublisher } from '../../../common/events/ports/event-publisher.port';
import { UserNotFoundException } from '../domain/exceptions/user-not-found.exception';

export class ChangePasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly clock: IClock,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<ChangePasswordResult> {
    const user = await this.userRepository.findById(command.userId);
    if (!user) throw new UserNotFoundException(command.userId);

    const hashedPassword = await this.passwordHasher.hash(command.newPassword);

    user.changePassword(hashedPassword, this.clock.now());

    await this.userRepository.update(user);
    await this.eventPublisher.publishAll(user.domainEvents);
    user.clearDomainEvents();

    return new ChangePasswordResult(user.id, user.updatedAt);
  }
}
