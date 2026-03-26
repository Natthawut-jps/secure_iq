import { IPasswordService } from './ports/IPasswordService';
import * as bcrypt from 'bcrypt';

// bcrypt-password.service.ts (adapter)
export class BcryptPasswordService implements IPasswordService {
  async compare(plain: string, hashed: string) {
    return await bcrypt.compare(plain, hashed);
  }

  async hash(plain: string) {
    return await bcrypt.hash(plain, 10);
  }
}
