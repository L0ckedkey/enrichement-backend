import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpService } from 'src/http/http.service';

@Injectable()
export class UserService {
  
  tableName: string = 'user'
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService){}

  async register(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, process.env.SALT);
      await this.prisma.user.create({data: createUserDto})

      return this.httpService.returnHTTPOK(this.tableName, 'register')
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email: loginUserDto.email } });
    
      if (!await bcrypt.compare(loginUserDto.password, user.password) || user.banned) {
        return this.httpService.forbiddenAccess()
      }

      return this.httpService.returnHTTPOK(this.tableName, 'login')
    } catch (error) {
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
