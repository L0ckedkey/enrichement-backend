import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpService } from 'src/http/http.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HttpService],
  imports: [PrismaModule]
})
export class UserModule {}
