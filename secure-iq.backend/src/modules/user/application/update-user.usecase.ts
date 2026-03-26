import { IUserRepository } from '../domain/user.repository';
import { IEventPublisher } from '../../../common/events/ports/event-publisher.port';
import { IClock } from '../../../common/clock/clock.port';
import { UpdateUserCommand } from './dto/update-user/update-user.command';
import { UpdateUserResult } from './dto/update-user/update-user.result';
import { UserNotFoundException } from '../domain/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from '../domain/exceptions/user-already-exists.exception';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventPublisher: IEventPublisher,
    private readonly clock: IClock,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UpdateUserResult> {
    const user = await this.userRepository.findById(command.userId);
    if (!user) throw new UserNotFoundException(command.userId);

    if (command.email && command.email !== user.email) {
      const emailTaken = await this.userRepository.existsByEmail(command.email);
      if (emailTaken) throw new UserAlreadyExistsException(command.email);
    }
    
    user.updateProfile(
      {
        name: command.name,
        email: command.email,
      },
      this.clock.now(),
    );

    await this.userRepository.update(user);
    await this.eventPublisher.publishAll(user.domainEvents);
    user.clearDomainEvents();

    return new UpdateUserResult(
      user.id,
      user.name,
      user.email,
      user.status,
      user.updatedAt,
      user.version,
    );
  }
}
