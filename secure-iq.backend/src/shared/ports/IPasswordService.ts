// IPasswordService.ts (port)
export const PASSWORD_SERVICE = Symbol('PASSWORD_SERVICE');
export interface IPasswordService {
  compare(plain: string, hashed: string): Promise<boolean>;
  hash(plain: string): Promise<string>;
}
