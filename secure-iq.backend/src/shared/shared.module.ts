import { BcryptPasswordService } from './bcrypt-password-service';

import { Module } from '@nestjs/common';
import { PASSWORD_SERVICE } from './ports/IPasswordService';
import { TOKEN_SERVICE } from './ports/token-service.port';
import { JwtTokenService } from './security/jwt-token-service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: PASSWORD_SERVICE,
      useClass: BcryptPasswordService,
    },
    {
      provide: TOKEN_SERVICE,
      useFactory(jwtService: JwtService) {
        return new JwtTokenService(jwtService);
      },
      inject: [JwtService],
    },
  ],
  exports: [PASSWORD_SERVICE, TOKEN_SERVICE],
})
export class SharedModule {}
