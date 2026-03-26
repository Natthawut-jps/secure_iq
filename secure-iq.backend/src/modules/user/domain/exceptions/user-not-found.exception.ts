// user-not-found.exception.ts
import { NotFoundException } from '@nestjs/common';
export class UserNotFoundException extends NotFoundException {
  constructor(id: string) {
    super({ code: 'USER_NOT_FOUND', message: `User '${id}' not found` });
  }
}
