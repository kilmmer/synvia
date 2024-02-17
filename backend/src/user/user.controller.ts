import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAll() {
        return this.userService.findAll();
    }
}
