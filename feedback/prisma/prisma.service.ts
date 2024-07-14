// Import necessary modules from NestJS and Prisma
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Use the @Injectable() decorator to allow this service to be injected into other providers.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // This method will be called when the module is initialized.
  async onModuleInit() {
    // Connect to the Prisma client.
    await this.$connect();
  }

  // This method will be called when the application is shutting down.
  async onModuleDestroy() {
    // Clean up by disconnecting from the Prisma client.
    await this.$disconnect();
  }
}
