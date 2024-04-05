import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PostgresModule } from 'nest-postgres';
import { TaskModule } from './task.module';

describe('TaskService', () => {
    let service: TaskService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TaskModule],
            imports: [TaskModule, PostgresModule],
        }).compile();

        service = module.get<TaskService>(TaskService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
