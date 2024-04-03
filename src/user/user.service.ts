import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpService } from 'src/http/http.service';
import { FastifyReply } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  
  tableName: string = 'user'
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService, private readonly jwtService: JwtService, private readonly mailerService: MailerService){}

  async decodeToken(token: string) {
    try {
      console.log('here')
      const decoded = await this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      throw new Error('Invalid token');
    }
  }

  async register(createUserDto: CreateUserDto, response: FastifyReply) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, process.env.SALT);
      const result = await this.prisma.user.create({
        data: {
          company: createUserDto.company,
          dob: new Date(createUserDto.dob),
          email: createUserDto.email,
          first_name: createUserDto.first_name,
          last_name: createUserDto.last_name,
          password: createUserDto.password,
          phone_number: createUserDto.phone_number,
          gender: createUserDto.gender
      }})

      // const payload = { id: result.id, first_name: result.first_name, last_name: result.last_name };
      await this.sendUserConfirmation(result.id, result.email)
      return  {
        code : 200,
        // token: await this.jwtService.signAsync(payload),
        message: 'register success'
      }
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async login(loginUserDto: LoginUserDto, response: FastifyReply) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email: loginUserDto.email } });
    
      if (!await bcrypt.compare(loginUserDto.password, user.password) || user.isBan) {
        return {
          code: 403,
          message: "Forbidden Access, please make sure email is validated"
        }
      }

      const payload = { id: user.id, first_name: user.first_name, last_name: user.last_name };
      
      return  {
        code : 200,
        token: await this.jwtService.signAsync(payload),
        message: 'login success'
      }
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async sendUserConfirmation(id: number, email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to EntreIndex! Confirm your Email',
        template: './confirmation',
        context: { 
          name: 'Email confirmation',
          id,
        },
      });
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async confirm(id: string){
    try {
      const result = await this.httpService.findUniqueWithError(this.prisma.user.findUnique({
        where: {
          id: +id
        }
      }),this.tableName)

      await this.prisma.user.update({
        where: {
          id: +id
        },
        data: {
          isBan: false
        }
      })

      return this.httpService.returnHTTPOK(this.tableName, 'update')
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.sendError(error, this.tableName) 
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.httpService.findUniqueWithError(this.prisma.user.findUnique({
          where: {
              id: id,
              deletedAt: null
          },
          select: {
              id: true,
              banned: true,
              company: true,
              email: true,
              first_name: true,
              last_name: true,
              gender: true,
              phone_number: true
          }
      }), this.tableName);

      return data;
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.sendError(error.message, this.tableName);
    }
  }

  async findAll(){
    try {
      return await this.prisma.user.findMany({
        where: {
          deletedAt: null
        },
        select: {
          id: true,
          banned: true,
          company: true,
          email: true,
          first_name: true,
          last_name: true,
          gender: true,
          phone_number: true,
          isBan: true
      }
      });
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, process.env.SALT);

      await this.prisma.user.update({
        where: {
          email: updateUserDto.email
        },
        data: updateUserDto
      })

      return this.httpService.returnHTTPOK(this.tableName, 'update')
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }

  }

  async remove(id: number) {
    try {
      await this.prisma.user.update({
        where: {
          id: id 
        },
        data: {
          deletedAt: new Date()
        }
      })

      return this.httpService.returnHTTPOK(this.tableName, 'delete')
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }
}
