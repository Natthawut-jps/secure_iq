// auth/infrastructure/security/jwt-token-service.ts
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import {
  ITokenService,
  AccessTokenPayload,
} from '../ports/token-service.port';
import { InvalidTokenException } from '../../modules/auth/domain/exceptions/invalid-token.exception';

export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  // ── Access Token ──────────────────────────────────────────────────
  async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h',
    });
  }

async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  try {
    const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
      secret: process.env.JWT_SECRET,
    });
    return payload;
  } catch (err) {
    console.error('JWT verify failed:', err);
    throw new InvalidTokenException();
  }
}

  // ── Refresh Token ─────────────────────────────────────────────────
  generateRefreshToken(): string {
    // opaque random string ไม่ใช่ JWT ไม่มี payload ให้ decode
    return crypto.randomBytes(64).toString('hex');
  }

  // ── Verification Token ────────────────────────────────────────────
  generateVerificationToken(): string {
    // สั้นกว่า refresh token เพราะส่งใน URL
    return crypto.randomBytes(32).toString('hex');
  }

  // ── Hash ──────────────────────────────────────────────────────────
  hashToken(token: string): string {
    // hash ก่อนเก็บ DB ถ้า DB หลุด token ก็ใช้ไม่ได้
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
