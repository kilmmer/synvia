import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskEntity, TaskStatus } from '../entities/task.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto extends PartialType(TaskEntity) {
  @IsString({ message: 'Title must be informed' })
  title: string;

  @IsOptional()
  description: string;

  @IsString({ message: 'Status must be a string' })
  status: TaskStatus;

  @IsArray()
  @Transform(({ value }) => value || [])
  tags?: string[];

  @IsNumber()
  userId: number;
}
