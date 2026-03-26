// ❌ แบบนี้ Domain Layer รู้จัก NestJS
import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({ code: 'INVALID_TOKEN', message: 'Token is invalid or expired' });
  }
}
