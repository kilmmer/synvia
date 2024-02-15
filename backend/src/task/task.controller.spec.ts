import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity, TaskStatus } from './entities/task.entity';

describe('TaskController', () => {
  let controller: TaskController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task without tags', () => {
    expect(
      controller.create({
        title: 'test',
        description: 'test',
        status: TaskStatus.TODO,
        userId: 1,
      }),
    ).toBeDefined();
  });

  it('should create a task with tags', () => {
    expect(
      controller.create({
        title: 'test',
        description: 'test',
        status: TaskStatus.TODO,
        userId: 1,
        tags: ['tag1', 'tag2'],
      }),
    ).toBeDefined();
  });

  it('should return an array of tasks', () => {
    expect(controller.findAll()).toBeInstanceOf(Array<TaskEntity>);
  });

  it('should return a task by id', () => {
    expect(controller.findOne('1')).toBeDefined();
  });

  it('should return an task not found', () => {
    expect(controller.findOne('5')).toBeUndefined();
  });

  it('should update a task', () => {
    expect(
      controller.update('1', {
        description: 'test updating description of task',
      }),
    ).toBeDefined();
  });

  it('should change status of a task', () => {
    expect(controller.inProgress('1')).toHaveProperty(
      'status',
      TaskStatus.IN_PROGRESS,
    );
    expect(controller.inProgress('1')).toBeDefined();
  });

  it('should delete a task', () => {
    expect(controller.remove('1')).toBeDefined();
  });
});
