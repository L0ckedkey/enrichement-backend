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
    const answerArray: number[] = createAnswerDto.answer.split(',').map(Number);
    console.log(answerArray)

    try {
      const offset = 8
      const sub_dimensi_x1_1 = answerArray[0] + answerArray[1]
      const sub_dimensi_x1_2 = answerArray[2]
      const sub_dimensi_x1_3 = answerArray[3]
      const sub_dimensi_x2_1 = answerArray[4] + answerArray[5] + answerArray[6] + answerArray[7] + answerArray[8]
      const sub_dimensi_x2_2 = answerArray[9] + answerArray[10]
      const sub_dimensi_x2_3 = answerArray[11] + answerArray[12]
      const sub_dimensi_x3_1 = answerArray[13] + answerArray[14]
      const sub_dimensi_x3_2 = answerArray[15] + answerArray[17]
      const sub_dimensi_x3_3 = answerArray[18] + answerArray[19] + answerArray[20] + answerArray[21] + answerArray[22]
      const sub_dimensi_x3_4 = answerArray[23] + answerArray[24]
      const sub_dimensi_x4_1 = answerArray[25]
      const sub_dimensi_x4_2 = answerArray[26] + answerArray[27] + answerArray[28]
      const sub_dimensi_x4_3 = answerArray[29] + answerArray[30] + answerArray[31] + answerArray[32] + answerArray[33]
      const sub_dimensi_x4_4 = answerArray[34] + answerArray[35] + answerArray[36] + answerArray[37]
      const sub_dimensi_x4_5 = answerArray[38] + answerArray[39] + answerArray[40] + answerArray[41]
      const sub_dimensi_x5_1 = answerArray[42] + answerArray[43]
      const sub_dimensi_x5_2 = answerArray[44] + answerArray[45]
      const dimensi_1 = sub_dimensi_x1_1 + sub_dimensi_x1_2 + sub_dimensi_x1_3
      const dimensi_2 = sub_dimensi_x2_1 + sub_dimensi_x2_2 + sub_dimensi_x2_3
      const dimensi_3 = sub_dimensi_x3_1 + sub_dimensi_x3_2 + sub_dimensi_x3_3 + sub_dimensi_x3_4
      const dimensi_4 = sub_dimensi_x4_1 + sub_dimensi_x4_2 + sub_dimensi_x4_3 + sub_dimensi_x4_4 + sub_dimensi_x4_5
      const dimensi_5 = sub_dimensi_x5_1 + sub_dimensi_x5_2


      await this.prisma.answer.create({
        data: {
          profile: createAnswerDto.profile,
          total: createAnswerDto.total,
          city_id: createAnswerDto.city_id,
          user_id: createAnswerDto.user_id,
          dimensi_1: dimensi_1,
          dimensi_2: dimensi_2,
          dimensi_3: dimensi_3,
          dimensi_4: dimensi_4,
          dimensi_5: dimensi_5,
          dimensi_6: answerArray[0],
          dimensi_7: answerArray[1],
          dimensi_8: answerArray[2],
          dimensi_9: answerArray[3],
          dimensi_10: answerArray[4],
          dimensi_11: answerArray[5],
          dimensi_12: answerArray[6],
          dimensi_13: answerArray[7],
          dimensi_14: answerArray[8],
          sub_dimensi_x1_1: sub_dimensi_x1_1,
          sub_dimensi_x1_2: sub_dimensi_x1_2,
          sub_dimensi_x2_1: sub_dimensi_x2_1,
          sub_dimensi_x2_2: sub_dimensi_x2_2,
          sub_dimensi_x3_1: sub_dimensi_x3_1,
          sub_dimensi_x3_2: sub_dimensi_x3_2,
          sub_dimensi_x4_1: sub_dimensi_x4_1,
          sub_dimensi_x4_2: sub_dimensi_x4_2,
          sub_dimensi_x4_3: sub_dimensi_x4_3,
          sub_dimensi_x5_1: sub_dimensi_x5_1,
          sub_dimensi_x5_2: sub_dimensi_x5_2,
        }
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
          dimensi_1: true,
          dimensi_2: true,
          dimensi_3: true,
          dimensi_4: true,
          dimensi_5: true,
          sub_dimensi_x1_1: true,
          sub_dimensi_x1_2: true,
          sub_dimensi_x2_1: true,
          sub_dimensi_x2_2: true,
          sub_dimensi_x3_1: true,
          sub_dimensi_x3_2: true,
          sub_dimensi_x4_1: true,
          sub_dimensi_x4_2: true,
          sub_dimensi_x4_3: true,
          sub_dimensi_x5_1: true,
          sub_dimensi_x5_2: true,
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
          dimensi_1: true,
          dimensi_2: true,
          dimensi_3: true,
          dimensi_4: true,
          dimensi_5: true,
          sub_dimensi_x1_1: true,
          sub_dimensi_x1_2: true,
          sub_dimensi_x2_1: true,
          sub_dimensi_x2_2: true,
          sub_dimensi_x3_1: true,
          sub_dimensi_x3_2: true,
          sub_dimensi_x4_1: true,
          sub_dimensi_x4_2: true,
          sub_dimensi_x4_3: true,
          sub_dimensi_x5_1: true,
          sub_dimensi_x5_2: true,
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
