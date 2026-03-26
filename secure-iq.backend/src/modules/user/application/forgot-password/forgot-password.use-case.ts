import { ForgotPasswordCommand } from './forgot-password.command';
import { IUserRepository } from '../../domain/user.repository';
import { IEventPublisher } from '../../../../common/events/ports/event-publisher.port';

export class ForgotPasswordUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(command: ForgotPasswordCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new Error('User not found');
    }

    // สร้าง event แล้วให้ user aggregate raise ขึ้นมา
    user.requestPasswordReset();

    await this.eventPublisher.publishAll(user.domainEvents);
    user.clearDomainEvents();
  }
}
