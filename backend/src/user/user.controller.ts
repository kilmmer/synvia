import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getAll() {
        const users = await this.userService.findAll();

        return {
            statusCode: HttpStatus.OK,
            message: 'Query successful',
            data: users,
        };
    }
}
