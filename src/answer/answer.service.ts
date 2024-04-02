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

  async highestAverageProvince(){
    try {
      const average = await this.prisma.$queryRaw`SELECT AVG(answers.total) as avg, p.name FROM answers JOIN cities c ON c.id = answers.city_id JOIN provinces p ON p.id = c.province_id GROUP BY c.province_id  ORDER BY AVG(answers.total) desc LIMIT 5`

      return average
      
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async highestAverageCity(){
    let final_result = []
    try {
      const average = await this.prisma.answer.groupBy({
        by: ['city_id'],
        take: 5,
        _avg: {
            total: true
        },
        orderBy: {
          _avg: {
            total: 'desc'
          }
        }
      })

      for (const result of average) {
        const city_name = await this.prisma.city.findUnique({
          select: {
            name: true
          },
          where: {
            id: result.city_id
          }
        })
        final_result.push({
          city_name: city_name.name,
          avg: result._avg.total
        })
      }

      return final_result
      
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async highesLowestProvince(){
    let final_result = []
    try {
      let highest = await this.prisma.$queryRaw`select max(a.total) as max from answers a JOIN cities c ON c.id = a.city_id JOIN provinces p ON p.id = c.province_id`
      let lowest = await this.prisma.$queryRaw`select min(a.total) as min from answers a JOIN cities c ON c.id = a.city_id JOIN provinces p ON p.id = c.province_id`


      const res_high = await this.prisma.answer.findMany({
        where: {
          total: highest[0].max
        },
        select: {
          city_reference: {
            include: {
              Province_reference: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })

      const res_low = await this.prisma.answer.findMany({
        where: {
          total: lowest[0].min
        },
        select: {
          city_reference: {
            include: {
              Province_reference: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })

      return {
        res_high,
        res_low
      }
      
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async highesLowestCity(){
    let final_result = []
    try {
      let highest = await this.prisma.answer.findMany({
        take: 1,
        orderBy: {
          total:'desc'
        },
        select: {
          total: true
        }
      })
      let lowest = await this.prisma.answer.findMany({
        take: 1,
        orderBy: {
          total:'asc'
        },
        select: {
          total: true
        }
      })

      const res_high = await this.prisma.answer.findMany({
        where: {
          total: highest[0].total
        },
        select: {
          city_reference: {
            include: {
              Province_reference: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })

      const res_low = await this.prisma.answer.findMany({
        where: {
          total: lowest[0].total
        },
        select: {
          city_reference: {
            include: {
              Province_reference: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })

      return {
        res_high,
        res_low
      }
      
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
