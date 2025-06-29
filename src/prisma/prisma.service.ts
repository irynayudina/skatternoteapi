import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// Use different Prisma clients based on environment
const isDevelopment = process.env.NODE_ENV !== 'production';

@Injectable()
export class PrismaService extends (isDevelopment 
  ? require('../../generated/prisma').PrismaClient 
  : require('@prisma/client').PrismaClient
) implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
} 