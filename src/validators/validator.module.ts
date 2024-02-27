import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsUniqueValidator } from './unique.validator';

@Module({
  providers: [IsUniqueValidator, PrismaService],
  exports: [IsUniqueValidator]
})
export class IsUniqueModule {}
