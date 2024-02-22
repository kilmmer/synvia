import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/task.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return await this.taskService.create(createTaskDto);
    }

    @Get()
    async findAll() {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.taskService.findAll(),
        };
    }

    @Get('/user/:userId')
    async findAllByUser(@Param() userId: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.taskService.findByUserId(+userId),
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.taskService.findOne(+id),
        };
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.taskService.update(+id, updateTaskDto),
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.taskService.remove(+id),
        };
    }

    @Patch(':id/done')
    async done(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.taskService.update(+id, { status: TaskStatus.DONE }),
        };
    }

    @Patch(':id/in-progress')
    async inProgress(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.taskService.update(+id, { status: TaskStatus.IN_PROGRESS }),
        };
    }
}
