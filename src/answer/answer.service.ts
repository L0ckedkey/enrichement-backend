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
      return this.httpService.returnHTTPOK(this.tableName, 'create')
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async sorted(){
    try {
      const lowest = await this.prisma.answer.findMany({
        orderBy: {
          total: 'asc'
        },
        take: 1 
      })

      const highest = await this.prisma.answer.findMany({
        orderBy: {
          total: 'desc'
        },
        take: 1 
      })
      
      return {
        lowest, highest
      }
      
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async average(province: number){
    try {
        const provinceResult = await this.httpService.findUniqueWithError(this.prisma.province.findUnique({
          where: {
              id: province
          },
          select: {
              id: true
          }
      }), 'province');
      
      const average = await this.prisma.answer.aggregate({
        _avg: {
            total: true
        },
        where: {
            city_reference: {
              province_id: provinceResult.id
            }
          }
        })

      return average._avg.total == null ? 0 : average._avg.total
      
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async findAll(){
    try {
      return await this.prisma.answer.findMany({
        select: {
          answer: true,
          createdAt: true,
          city_reference: {
            select: {
              province_id: true,
              name: true,
              Province_reference: {
                select: {
                  name: true,
                }
              }
            }
          },
          user_reference: {
            select: {
              first_name: true,
              last_name: true
            }
          }
        }
      })
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
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
          id: true,
        }
      }), this.tableName)

      return this.prisma.answer.findMany({
        where:  {
          user_id: result.id
        }
      })
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)      
    }
  }

  async findOneAns(id: number){
    try {
      const result: any = await this.httpService.findUniqueWithError(this.prisma.answer.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          answer: true
        }
      }), this.tableName)
   
      return this.prisma.answer.findMany({
        where:  {
          id: result.id
        }
      })
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)      
    }
  }

  async findByCity(city: number){
    try {
      const result: any = await this.httpService.findUniqueWithError(this.prisma.city.findUnique({
        where: {
          id: city
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
      if(process.env.MODE == 'development'){
        console.log(error)
      }
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
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)      
    }
  }
}
