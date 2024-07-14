import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FeedbackService {
  constructor(
    private prisma: PrismaService,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  async createFeedback(data: { userId: string; category: string; comments: string }) {
    return this.prisma.feedback.create({
      data,
    });
  }

  async getAllFeedbacks() {
    try {
      const feedbacks = await this.prisma.feedback.findMany();
      const feedbacksWithUser = await Promise.all(
        feedbacks.map(async feedback => {
          const user = await firstValueFrom(
            this.userServiceClient.send({ cmd: 'get_user' }, { userId: feedback.userId })
          );
          return { ...feedback, userEmail: user.email };
        })
      );
      return feedbacksWithUser;
    } catch (error) {
      throw new BadRequestException('Could not fetch feedback');
    }
  }

  async updateFeedback(userId: string, category: string, comments: string) {
    return this.prisma.feedback.update({
      where: {
        userId_category: {
          userId,
          category,
        },
      },
      data: {
        comments,
      },
    });
  }

  async deleteFeedback(userId: string, category: string) {
    return this.prisma.feedback.delete({
      where: {
        userId_category: {
          userId,
          category,
        },
      },
    });
  }
}
