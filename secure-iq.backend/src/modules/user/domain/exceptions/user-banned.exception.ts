// user-banned.exception.ts
import { ForbiddenException } from '@nestjs/common';
export class UserBannedException extends ForbiddenException {
  constructor(id: string) {
    super({ code: 'USER_BANNED', message: `User '${id}' is banned` });
  }
}
