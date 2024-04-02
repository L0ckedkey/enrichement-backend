import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { HttpService } from 'src/http/http.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, HttpService],
  imports: [PrismaModule]
})
export class AnswerModule {}
