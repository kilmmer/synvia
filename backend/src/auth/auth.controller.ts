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
        const user = await this.authService.login(loginUserDto.email, loginUserDto.password);

        if (!user || user.message) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Login successful',
            data: user,
        };
    }

    @Post('register')
    async register(@Body() registerUserDto: CreateUserDto) {
        const user = await this.authService.register(registerUserDto);

        if (!user || user['message']) {
            throw new HttpException(user['message'], HttpStatus.BAD_REQUEST);
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Register successful',
            data: user,
        };
    }

    @Post('refresh-token')
    async refreshToken(@Body() body: { refresh_token: string }) {
        const { refresh_token } = body;

        if (refresh_token === undefined) return new HttpException('Refresh token is required', HttpStatus.BAD_REQUEST);

        const refresh = this.authService.refresh(refresh_token);

        if (!refresh || refresh['message']) {
            throw new HttpException(refresh['message'], HttpStatus.BAD_REQUEST);
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Refresh token successful',
            data: refresh,
        };
    }

    @Get('allusers')
    getUsers() {
        return {
            statusCode: HttpStatus.OK,
            message: 'Get users successful',
            data: this.userService.findAll(),
        };
    }
}
