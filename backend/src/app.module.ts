import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PostgresModule } from 'nest-postgres';

@Module({
    imports: [
        UserModule,
        TaskModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        PostgresModule.forRoot(configuration().database),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
