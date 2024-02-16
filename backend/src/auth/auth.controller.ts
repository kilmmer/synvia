import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: Pick<User, 'email' | 'password'>) {
    const user = await this.authService.login(
      loginUserDto.email,
      loginUserDto.password,
    );

    console.log(user);

    if (!user || user.message) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  @Post('register')
  async register(@Body() registerUserDto: CreateUserDto) {
    const user = await this.authService.register(registerUserDto);

    if (!user || user['message']) {
      throw new HttpException(user['message'], HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
