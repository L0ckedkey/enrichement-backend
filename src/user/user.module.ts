import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpService } from 'src/http/http.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  controllers: [UserController],
  providers: [UserService, HttpService],
  imports: [PrismaModule,MailerModule.forRoot({
    // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    // or
    transport: {
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: 'sasmoko23@gmail.com',
        pass: 'otni ratk vdtq fahb',
      },
    },
    template: {
      dir: 'src/user/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: false,
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
  }), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  }),
    
  ]
})
export class UserModule {}
