import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FeedbackModule } from './feedback.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FeedbackModule, {
    transport: Transport.TCP,
    options: {
      port: 4002,
    },
  });
  await app.listen();
}
bootstrap();
