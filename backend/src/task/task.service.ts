import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  private tasks = [];

  create(createTaskDto: CreateTaskDto) {
    if (this.tasks.length === 0) {
      createTaskDto.id = 1;
    } else {
      createTaskDto.id = this.tasks[this.tasks.length - 1]?.id + 1;
    }
    createTaskDto.createdAt = new Date();
    this.tasks.push(createTaskDto);

    return createTaskDto;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task: TaskEntity) => task.id === id);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.filter((task) => task.id === id);
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (task.length === 0) {
      return null;
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
    };

    return this.tasks[taskIndex];
  }

  remove(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);
    return this.tasks;
  }
}
