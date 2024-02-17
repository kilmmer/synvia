import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() loginUserDto: Pick<User, 'email' | 'password'>) {
        console.log(loginUserDto);
        const user = await this.authService.login(loginUserDto.email, loginUserDto.password);

        console.log('18', user);

        if (!user || user.message) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    @Post('register')
    async register(@Body() registerUserDto: CreateUserDto) {
        const user = this.authService.register(registerUserDto);

        if (!user || user['message']) {
            throw new HttpException(user['message'], HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    @Post('refresh-token')
    async refreshToken(@Body() body: { refreshToken: string }) {
        console.log(body);
        const { refreshToken } = body;

        return this.authService.refresh(refreshToken);
    }

    @Get('allusers')
    getUsers() {
        return this.userService.findAll();
    }
}
