import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateFeedbackDto } from './feedback.dto';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('FEEDBACK_SERVICE') private feedbackService: ClientProxy,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth flow
  }

  @Post('google/callback')
  async googleAuthRedirect(@Body() req) {
    const code = req.access_token;
    const user = await firstValueFrom(
      this.userServiceClient.send(
        { cmd: 'verify_google_token' },
        { token: code },
      ),
    );

    return user;
  }

  @Post('feedback')
  async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.send(
      { cmd: 'create_feedback' },
      createFeedbackDto,
    );
  }

  @Get('feedbacks')
  getAllFeedbacks() {
    return this.feedbackService.send({ cmd: 'get_all_feedbacks' }, {});
  }
}
