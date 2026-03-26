import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
