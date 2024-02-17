import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/constants/jwt';

@Module({
    providers: [UserService],
    imports: [
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn: '300s' },
        }),
    ],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
