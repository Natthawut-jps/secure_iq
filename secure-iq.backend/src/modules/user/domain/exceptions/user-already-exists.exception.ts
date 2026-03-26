import { ConflictException } from '@nestjs/common';
// user-already-exists.exception.ts
export class UserAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super({
      code: 'USER_ALREADY_EXISTS',
      message: `Email '${email}' is already taken`,
    });
  }
}
