// auth/application/ports/token-service.port.ts
export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface ITokenService {
  // ── Access Token (JWT อายุสั้น) ───────────────────────────────────
  generateAccessToken(payload: AccessTokenPayload): Promise<string>;
  verifyAccessToken(token: string): Promise<AccessTokenPayload>;

  // ── Refresh Token (opaque random string อายุยาว) ──────────────────
  generateRefreshToken(): string; // return raw token

  // ── Email Verification Token (opaque random string) ───────────────
  generateVerificationToken(): string;

  // ── Hashing (ใช้กับ refresh + verification token ก่อนเก็บ DB) ─────
  hashToken(token: string): string;
}

export interface AccessTokenPayload {
  sub: string; // userId
  email: string;
}
