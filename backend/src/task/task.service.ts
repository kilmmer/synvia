import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
    private task = [];

    create(createTaskDto: CreateTaskDto) {
        if (this.task.length === 0) {
            createTaskDto.id = 1;
        } else {
            createTaskDto.id = this.task[this.task.length - 1]?.id + 1;
        }
        createTaskDto.createdAt = new Date();
        this.task.push(createTaskDto);

        return createTaskDto;
    }

    findAll() {
        return this.task;
    }

    findOne(id: number) {
        const task = this.task.find((task: TaskEntity) => task.id === id);
        return task;
    }

    findByUserId(userId: number) {
        const tasks = this.task.filter((task: TaskEntity) => task.userId === userId);
        return tasks;
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {
        const task = this.task.find((task) => task.id === id);
        const taskIndex = this.task.findIndex((task) => task.id === id);

        if (task.length === 0) {
            return null;
        }

        this.task[taskIndex] = {
            ...this.task[taskIndex],
            ...updateTaskDto,
        };

        return this.task[taskIndex];
    }

    remove(id: number) {
        const index = this.task.findIndex((task) => task.id === id);
        this.task.splice(index, 1);
        return this.task;
    }
}
