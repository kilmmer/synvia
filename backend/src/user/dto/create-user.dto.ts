import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    createdAt?: Date;
}
