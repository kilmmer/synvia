import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './constants/jwt';

@Module({
  imports: [
    UserModule,
    TaskModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
