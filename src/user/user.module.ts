import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpService } from 'src/http/http.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, HttpService],
  imports: [PrismaModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  }),]
})
export class UserModule {}
