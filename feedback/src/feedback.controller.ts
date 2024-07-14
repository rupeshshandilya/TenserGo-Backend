import { Controller, Post, Body, Get, Query, Logger, Patch, Param, HttpException, Delete, HttpStatus } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

import { MessagePattern } from '@nestjs/microservices';
import { CreateFeedbackDto, UpdateFeedbackDto } from './feedback.dto';

@Controller()
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @MessagePattern({ cmd: 'create_feedback' })
  createFeedback(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @MessagePattern({ cmd: 'get_all_feedbacks' })
  getAllFeedbacks() {
    return this.feedbackService.getAllFeedbacks();
  }

  @Patch('update')
updateFeedback(@Body() updateFeedbackDto: UpdateFeedbackDto) {
  return this.feedbackService.updateFeedback(updateFeedbackDto.userId, updateFeedbackDto.category, updateFeedbackDto.comments);
}

@Delete('delete/:userId/:category')
deleteFeedback(@Param('userId') userId: string, @Param('category') category: string) {
  Logger.log(`Deleting feedback for user ${userId} in category ${category}`);
  return this.feedbackService.deleteFeedback(userId, category);
}
}
