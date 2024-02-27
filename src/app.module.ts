import { Module, ValidationPipe  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpService } from './http/http.service';
import { APP_PIPE } from '@nestjs/core';
import { IsExistValidator, IsUniqueValidator } from './validators/unique.validator';

@Module({
  imports: [ProvinceModule, AnswerModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, HttpService, IsUniqueValidator, IsExistValidator,
    {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule {}
