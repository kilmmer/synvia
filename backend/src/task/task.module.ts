import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/constants/jwt';

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports: [
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn: '300s' },
        }),
    ],
})
export class TaskModule {}
