import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { createHash } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = this.userService.findByEmail(email);
    console.log(user);
    if (!user) {
      return {
        message: 'User or password incorrect',
      };
    }

    const hashPassword = createHash('sha256').update(password).digest('hex');

    if (user['password'] !== hashPassword) {
      return {
        message: 'User or incorrect password',
      };
    }

    delete user.password;

    return { ...user, ...this.generateToken(user) };
  }

  register(user: CreateUserDto) {
    const userExists = this.userService.findByEmail(user.email);

    if (userExists) {
      return {
        message: 'User already exists',
      };
    }
    const newUser = this.userService.create(user);

    delete newUser.password;

    return {
      ...newUser,
      ...this.generateToken(newUser),
    };
  }

  refresh(token: string) {
    const decodedToken = this.jwtService.decode(token);

    const user = this.userService.findOne(decodedToken.sub);

    delete user.password;

    return {
      ...user,
      ...this.generateToken(user),
    };
  }

  private generateToken(data) {
    const payload = { username: data.email, sub: data.id };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '300s',
      }),
    };
  }
}
