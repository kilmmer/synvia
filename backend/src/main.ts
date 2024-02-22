import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import createTable from './migrations/createTable';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.setGlobalPrefix('api/v1');
    createTable();
    await app.listen(3000);
}
bootstrap();
