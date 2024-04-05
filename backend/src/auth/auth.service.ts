import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { createHash } from 'crypto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, _password: string) {
        const user: User = await this.userService.findByEmail(email);

        if (user === undefined) {
            return {
                message: 'User or password incorrect',
            };
        }

        const hashPassword = createHash('sha256').update(_password).digest('hex');

        if (user['password'] !== hashPassword) {
            return {
                message: 'User or incorrect password',
            };
        }

        // delete user.password;
        const { password, ...rest } = user;

        return { ...rest, ...this.generateToken(user) };
    }

    async register(user: CreateUserDto) {
        const userExists = await this.userService.findByEmail(user.email);

        if (userExists) {
            return {
                message: 'User already exists',
            };
        }
        const newUser = await this.userService.create(user);

        // delete newUser.password;

        const { password, ...rest } = newUser;

        return { ...rest, ...this.generateToken(user) };
    }

    async refresh(token: string) {
        const decodedToken = this.jwtService.decode(token, { json: true, complete: true });

        const user = await this.userService.findOne(decodedToken.payload.sub);

        if (!user) {
            return {
                message: 'User not found',
            };
        }

        // delete user.password;
        const { password, ...rest } = user;

        return { ...rest, ...this.generateToken(user) };
    }

    private generateToken(data: any) {
        const payload = { username: data.email, sub: data.id };

        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '15m' }),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: '15m',
                secret: process.env.JWT_SECRET,
                jwtid: 'refresh',
            }),
        };
    }
}
