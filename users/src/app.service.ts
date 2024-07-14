import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { AuthenticateUserDto } from './authenticate-user.dto';
import { GoogleAuthService } from './google-auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { User } from './interface/app.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private prisma: PrismaService,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userId = uuidv4();
    return this.prisma.user.create({
      data: {
        id: userId,
        email: createUserDto.email,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async authenticateUser(
    authenticateUserDto: AuthenticateUserDto,
  ): Promise<User> {
    const { token } = authenticateUserDto;
    const payload = await this.googleAuthService.verifyToken(token);
    const existingUser = await this.getUserByEmail(payload.email);
    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.createUser({ email: payload.email });
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
