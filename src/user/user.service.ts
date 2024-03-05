import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpService } from 'src/http/http.service';
import { FastifyReply } from 'fastify';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  
  tableName: string = 'user'
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService, private readonly jwtService: JwtService){}

  async decodeToken(token: string) {
    try {
      console.log('here')
      const decoded = await this.jwtService.verify(token);
      return decoded;
    } catch (error) {
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

      const payload = { id: result.id, first_name: result.first_name, last_name: result.last_name };

      return  {
        code : 200,
        token: await this.jwtService.signAsync(payload),
        message: 'register success'
      }
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async login(loginUserDto: LoginUserDto, response: FastifyReply) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email: loginUserDto.email } });
    
      if (!await bcrypt.compare(loginUserDto.password, user.password) || user.banned) {
        return this.httpService.forbiddenAccess()
      }

      const payload = { id: user.id, first_name: user.first_name, last_name: user.last_name };
      const expirationTime = new Date();
      expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours in milliseconds
      response.setCookie('auth', await this.jwtService.signAsync(payload), {path: '/', expires: expirationTime })

      // return  {
      //   code : 200,
      //   token: await this.jwtService.signAsync(payload),
      //   message: 'login success'
      // }
    } catch (error) {
      console.log(error)
      return this.httpService.returnInternalServerError(this.tableName)
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
          phone_number: true
      }
      });
    } catch (error) {
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
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }
}
