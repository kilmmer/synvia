import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const id = this.users.length > 0 ? this.users.length + 1 : 1;

    createUserDto.password = createHash('sha256')
      .update(createUserDto.password)
      .digest('hex');

    const newUser: User = {
      id: id,
      ...createUserDto,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const find = this.users.find((user) => user.id === id);

    if (!find) {
      return new Error('User not found');
    }

    return find;
  }

  findByEmail(email: string) {
    const find = this.users.find((user) => user.email === email);

    return find;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedAt = new Date();

    if (updateUserDto.password) {
      updateUserDto.password = createHash('sha256')
        .update(updateUserDto.password)
        .digest('hex');
    }

    this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }

      return user;
    });

    return updateUserDto;
  }

  remove(id: number) {
    this.users.filter((user) => user.id !== id);

    return 'User deleted';
  }
}
