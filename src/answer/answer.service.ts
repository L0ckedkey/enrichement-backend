import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from 'src/http/http.service';

@Injectable()
export class AnswerService {

  tableName: string = 'answer'
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService){}

  async create(createAnswerDto: CreateAnswerDto) {
    try {
      await this.prisma.answer.create({
        data: createAnswerDto
      })
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async findOne(id: number) {
    try {
      const result: any = await this.httpService.findUniqueWithError(this.prisma.user.findUnique({
        where: {
          id: id,
          deletedAt: null,
          banned: false
        },
        select: {
          id: true
        }
      }), this.tableName)

      return this.prisma.answer.findMany({
        where:  {
          user_id: result.id
        }
      })
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)      
    }
  }

  async findByCity(city: string){
    try {
      const result: any = await this.httpService.findUniqueWithError(this.prisma.city.findUnique({
        where: {
          name: city
        },
        select: {
          id: true
        }
      }), this.tableName)

      return this.prisma.answer.findMany({
        where:  {
          city_id: result.id
        }
      })
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)      
    }
  }

  async findByProvince(province: string){
    try {
      const result: any = await this.httpService.findUniqueWithError(this.prisma.province.findUnique({
        where: {
          name: province
        },
        select: {
          id: true
        }
      }), this.tableName)

      return this.prisma.answer.findMany({
        where: {
          city_reference: {
            province_id: result.id
          }
        }
      })
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)      
    }
  }
}
