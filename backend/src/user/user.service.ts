import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { createHash } from 'crypto';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(@InjectClient() private readonly db: Client) {}

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = createHash('sha256').update(createUserDto.password).digest('hex');

        const result = await this.db.query(
            'INSERT INTO users (name, email, password, role, createdAt) VALUES ($1, $2, $3, $4, now()) RETURNING *',
            [createUserDto.name, createUserDto.email, createUserDto.password, createUserDto.role ?? 'user'],
        );

        return result.rows[0];
    }

    async findAll() {
        const result = await this.db.query('SELECT * FROM users');

        return result.rows;
    }

    async findOne(id: number): Promise<any> {
        const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);

        return result.rows[0];
    }

    async findByEmail(email: string) {
        const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);

        return result.rows[0];
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        updateUserDto.updatedAt = new Date();

        if (updateUserDto.password) {
            updateUserDto.password = createHash('sha256').update(updateUserDto.password).digest('hex');
        }

        const result = await this.db.query(
            'UPDATE users SET name = $1, email = $2, password = $3, role = $4, updatedAt = $5 WHERE id = $6 RETURNING *',
            [
                updateUserDto.name,
                updateUserDto.email,
                updateUserDto.password,
                updateUserDto.role,
                updateUserDto.updatedAt,
                id,
            ],
        );

        return result.rows[0];
    }

    async remove(id: number) {
        const result = await this.db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        return result.rows[0];
    }
}
