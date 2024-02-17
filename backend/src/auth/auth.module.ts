import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/constants/jwt';

@Module({
    providers: [AuthService],
    imports: [
        UserModule,
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn: '300s' },
        }),
    ],
    exports: [AuthService, AuthModule],
    controllers: [AuthController],
})
export class AuthModule {}
