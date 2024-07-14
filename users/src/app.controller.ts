import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';
import { AuthenticateUserDto } from './authenticate-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(private readonly userService: AppService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(data: { userId: string }) {
    return this.userService.getUserById(data.userId);
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.getUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      return existingUser;
    }
    return this.userService.createUser(createUserDto);
  }

  @Post('authenticate')
  authenticateUser(@Body() authenticateUserDto: AuthenticateUserDto) {
    return this.userService.authenticateUser(authenticateUserDto);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'verify_google_token' })
  async verifyGoogleToken(data: { token: string }) {
    return this.userService.authenticateUser({ token: data.token });
  }
}
