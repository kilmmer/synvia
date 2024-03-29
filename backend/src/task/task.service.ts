import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';
import { TaskStatus } from './entities';

@Injectable()
export class TaskService {
    constructor(@InjectClient() private readonly db: Client) {}

    async create(createTaskDto: CreateTaskDto) {
        const result = await this.db.query(
            `INSERT INTO tasks (title, description, userId, tags, status, createdAt) VALUES ($1, $2, $3, $4, $5, now()) RETURNING *`,
            [
                createTaskDto.title,
                createTaskDto.description,
                createTaskDto.userId,
                [createTaskDto.tags],
                TaskStatus.TODO,
            ],
        );

        return result.rows[0];
    }

    async findAll() {
        const result = await this.db.query('SELECT * FROM tasks');
        return result.rows;
    }

    async findOne(id: number) {
        const result = await this.db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        return result.rows[0];
    }

    async findByUserId(userId: number) {
        const result = await this.db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
        return result.rows;
    }

    async update(id: number, updateTaskDto: Partial<UpdateTaskDto>) {
        const objKeys = Object.keys(updateTaskDto);
        const objValues = Object.values(updateTaskDto);
        const query = objKeys.map((key, index) => `${key} = $${index + 1}`);

        console.log(`UPDATE tasks SET ${query} WHERE id = $${objKeys.length + 1} RETURNING *`, [...objValues, id]);

        const result = await this.db.query(`UPDATE tasks SET ${query} WHERE id = $${objKeys.length + 1} RETURNING *`, [
            ...objValues,
            id,
        ]);

        // console.log(result.rows[0]);
        return result.rows[0];
    }

    async remove(id: number) {
        const result = await this.db.query('DELETE FROM tasks WHERE id = $1', [id]);
        return result.rows[0];
    }
}
