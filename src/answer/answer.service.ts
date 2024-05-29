import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from 'src/http/http.service';

@Injectable()
export class AnswerService {

  tableName: string = 'answer'
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService){}

  x1_1: number = 5
  x1_2: number = 5
  x2_1: number = 5
  x2_2: number = 5
  x3_1: number = 5
  x3_2: number = 5
  x3_3: number = 5
  x4_1: number = 5
  x4_2: number = 5
  x4_3: number = 5
  x5_1: number = 5
  x5_2: number = 5
  dim1:number = 10
  dim2:number = 10
  dim3:number = 15
  dim4:number = 10
  dim5:number = 10
  

  async create(createAnswerDto: CreateAnswerDto) {
    console.log(createAnswerDto)
    const answerArray: number[] = createAnswerDto.answer.split(',').map(Number);
    console.log(answerArray)

    try {
      const offset = 8
      const sub_dimensi_x1_1 = answerArray[0 + 0] + answerArray[1 + 0] + answerArray[2 + 0] + answerArray[3 + 0] + answerArray[4 + 0]
      const sub_dimensi_x1_2 = answerArray[0 + 5] + answerArray[1 + 5] + answerArray[2 + 5] + answerArray[3 + 5] + answerArray[4 + 5]
      const sub_dimensi_x2_1 = answerArray[0 + 10] + answerArray[1 + 10] + answerArray[2 + 10] + answerArray[3 + 10] + answerArray[4 + 10]
      const sub_dimensi_x2_2 = answerArray[0 + 15] + answerArray[1 + 15] + answerArray[2 + 15] + answerArray[3 + 15] + answerArray[4 + 15]
      const sub_dimensi_x3_1 = answerArray[0 + 20] + answerArray[1 + 20] + answerArray[2 + 20] + answerArray[3 + 20] + answerArray[4 + 20]
      const sub_dimensi_x3_2 = answerArray[0 + 25] + answerArray[1 + 25] + answerArray[2 + 25] + answerArray[3 + 25] + answerArray[4 + 25]
      const sub_dimensi_x3_3 = answerArray[0 + 30] + answerArray[1 + 30] + answerArray[2 + 30] + answerArray[3 + 30] + answerArray[4 + 30]
      const sub_dimensi_x4_1 = answerArray[0 + 35] + answerArray[1 + 35] + answerArray[2 + 35] + answerArray[3 + 35] + answerArray[4 + 35]
      const sub_dimensi_x4_2 = answerArray[0 + 40] + answerArray[1 + 40] + answerArray[2 + 40] + answerArray[3 + 40] + answerArray[4 + 40]
      const sub_dimensi_x5_1 = answerArray[0 + 45] + answerArray[1 + 45] + answerArray[2 + 45] + answerArray[3 + 45] + answerArray[4 + 45]
      const sub_dimensi_x5_2 = answerArray[0 + 50] + answerArray[1 + 50] + answerArray[2 + 50] + answerArray[3 + 50] + answerArray[4 + 50]

      const dimensi_1 = sub_dimensi_x1_1 + sub_dimensi_x1_2
      const dimensi_2 = sub_dimensi_x2_1 + sub_dimensi_x2_2
      const dimensi_3 = sub_dimensi_x3_1 + sub_dimensi_x3_2 + sub_dimensi_x3_3
      const dimensi_4 = sub_dimensi_x4_1 + sub_dimensi_x4_2
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
          sub_dimensi_x3_3: sub_dimensi_x3_3,
          sub_dimensi_x4_1: sub_dimensi_x4_1,
          sub_dimensi_x4_2: sub_dimensi_x4_2,
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

  async getAverageProvinceDimension(province: number){
    try{
      let averageProvinceDimension = await this.prisma.$queryRaw`select avg(a.dimensi_1) as dim_1, avg(a.dimensi_2) as dim_2, avg(a.dimensi_3) as dim_3, avg(a.dimensi_4) as dim_4, avg(a.dimensi_5) as dim_5 from answers a JOIN cities c ON c.id = a.city_id JOIN provinces p ON p.id = c.province_id where p.id = ${province}`

      return averageProvinceDimension
    }catch(error){
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getAverageCityDimension(city: number){
    try{
      let averageCityDimension = await this.prisma.$queryRaw`select avg(a.dimensi_1) as dim_1, avg(a.dimensi_2) as dim_2, avg(a.dimensi_3) as dim_3, avg(a.dimensi_4) as dim_4, avg(a.dimensi_5) as dim_5 from answers a JOIN cities c ON c.id = a.city_id where c.id = ${city}`

      return averageCityDimension
    }catch(error){
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getAverageUserProvinceAnswerDimension(province: number, user_id: number){
    try{
      let averageUserProvinceDimension = await this.prisma.$queryRaw`select avg(a.dimensi_1) as dim_1, avg(a.dimensi_2) as dim_2, avg(a.dimensi_3) as dim_3, avg(a.dimensi_4) as dim_4, avg(a.dimensi_5) as dim_5 from answers a JOIN cities c ON c.id = a.city_id JOIN provinces p ON p.id = c.province_id where p.id = ${province} and a.user_id = ${user_id}`

      return averageUserProvinceDimension
    }catch(error){
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getAverageUserCityAnswerDimension(city: number, user_id: number){
    try{
      let averageUserCityDimension = await this.prisma.$queryRaw`select avg(a.dimensi_1) as dim_1, avg(a.dimensi_2) as dim_2, avg(a.dimensi_3) as dim_3, avg(a.dimensi_4) as dim_4, avg(a.dimensi_5) as dim_5 from answers a JOIN cities c ON c.id = a.city_id where c.id = ${city} and a.user_id = ${user_id}`

      return averageUserCityDimension
    }catch(error){
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getLastUserAnswer(userId: number) {
    try {
      const latestAnswer = await this.prisma.answer.findFirst({
        where: { user_id: userId },
        orderBy: { createdAt: 'desc' },
      });
      return latestAnswer;
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
          sub_dimensi_x3_3: true,
          sub_dimensi_x4_1: true,
          sub_dimensi_x4_2: true,
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
          sub_dimensi_x3_3: true,
          sub_dimensi_x4_1: true,
          sub_dimensi_x4_2: true,
          sub_dimensi_x5_1: true,
          sub_dimensi_x5_2: true
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

      const minFeatCity = await this.getFeatCity(city)
      const minDimCity = await this.getDimCity(city)

      const ansCity = await this.prisma.answer.findMany({
        where:  {
          city_id: result.id
        }
      })

      return {
        result: ansCity,
        minFeatCity: minFeatCity,
        minDimCity: minDimCity
      }
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

      const minFeatProv = await this.getFeatProv(result.id)
      const minDimProv = await this.getDimProv(result.id)

      const ansProv = await this.prisma.answer.findMany({
        where: {
          city_reference: {
            province_id: result.id
          }
        }
      })

      return {
        result: ansProv,
        minFeatProv: minFeatProv,
        minDimProv: minDimProv
      }
    } catch (error) {
      if(process.env.MODE == 'development'){
        console.log(error)
      }
      return this.httpService.returnInternalServerError(this.tableName)      
    }
  }

  async getFeatCity(kota: number){
    try {
      const answers = await this.prisma.answer.findMany({
        where: {
          city_id: kota
        },
        select: {
          sub_dimensi_x1_1: true,
          sub_dimensi_x1_2: true,
          sub_dimensi_x2_1: true,
          sub_dimensi_x2_2: true,
          sub_dimensi_x3_1: true,
          sub_dimensi_x3_2: true,
          sub_dimensi_x3_3: true,
          sub_dimensi_x4_1: true,
          sub_dimensi_x4_2: true,
          sub_dimensi_x5_1: true,
          sub_dimensi_x5_2: true
        }
      })
      if (answers.length === 0) {
        return []
      }

      const totals = {
        sub_dimensi_x1_1: 0,
        sub_dimensi_x1_2: 0,
        sub_dimensi_x2_1: 0,
        sub_dimensi_x2_2: 0,
        sub_dimensi_x3_1: 0,
        sub_dimensi_x3_2: 0,
        sub_dimensi_x3_3: 0,
        sub_dimensi_x4_1: 0,
        sub_dimensi_x4_2: 0,
        sub_dimensi_x4_3: 0,
        sub_dimensi_x5_1: 0,
        sub_dimensi_x5_2: 0,
      };

      answers.forEach(answer => {
        for (const key in answer) {
          if (key.startsWith('sub_dimensi_')) {
            totals[key] += answer[key];
          }
        }
      });
      
      const len = answers.length

      const percent_x1_1 = (totals.sub_dimensi_x1_1 / this.x1_1) * len;
      const percent_x1_2 = (totals.sub_dimensi_x1_2 / this.x1_2) * len;
      const percent_x2_1 = (totals.sub_dimensi_x2_1 / this.x2_1) * len;
      const percent_x2_2 = (totals.sub_dimensi_x2_2 / this.x2_2) * len;
      const percent_x3_1 = (totals.sub_dimensi_x3_1 / this.x3_1) * len;
      const percent_x3_2 = (totals.sub_dimensi_x3_2 / this.x3_2) * len;
      const percent_x3_3 = (totals.sub_dimensi_x3_3 / this.x3_3) * len;
      const percent_x4_1 = (totals.sub_dimensi_x4_1 / this.x4_1) * len;
      const percent_x4_2 = (totals.sub_dimensi_x4_2 / this.x4_2) * len;
      const percent_x4_3 = (totals.sub_dimensi_x4_3 / this.x4_3) * len;
      const percent_x5_1 = (totals.sub_dimensi_x5_1 / this.x5_1) * len;
      const percent_x5_2 = (totals.sub_dimensi_x5_2 / this.x5_2) * len;

      const percentages = [
        percent_x1_1,
        percent_x1_2,
        percent_x2_1,
        percent_x2_2,
        percent_x3_1,
        percent_x3_2,
        percent_x3_3,
        percent_x4_1,
        percent_x4_2,
        percent_x4_3,
        percent_x5_1,
        percent_x5_2,
      ];
  
      const highestPercentage = Math.min(...percentages);
      const minIndex = percentages.indexOf(highestPercentage);

      return minIndex

    } catch (error) {
      
      if(error.message == 'no ID'){
        return this.httpService.returnBadRequestException()
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getDimCity(kota: number){
    try {
      const answers = await this.prisma.answer.findMany({
        where: {
          city_id: kota
        },
        select: {
          dimensi_1: true,
          dimensi_2: true,
          dimensi_3: true,
          dimensi_4: true,
          dimensi_5: true,
          
        }
      })
      if (answers.length === 0) {
        return []
      }
      const totals = {
          dimensi_1: 0,
          dimensi_2: 0,
          dimensi_3: 0,
          dimensi_4: 0,
          dimensi_5: 0,
      };

      answers.forEach(answer => {
        for (const key in answer) {
          if (key.startsWith('sub_dimensi_')) {
            totals[key] += answer[key];
          }
        }
      });
      
      const len = answers.length

      const percent_x1_1 = (totals.dimensi_1 / this.dim1) * len;
      const percent_x1_2 = (totals.dimensi_2 / this.dim2) * len;
      const percent_x2_1 = (totals.dimensi_3 / this.dim3) * len;
      const percent_x2_2 = (totals.dimensi_4 / this.dim4) * len;
      const percent_x3_1 = (totals.dimensi_5 / this.dim5) * len;

      const percentages = [
        percent_x1_1,
        percent_x1_2,
        percent_x2_1,
        percent_x2_2,
        percent_x3_1,
      ];
  
      const highestPercentage = Math.min(...percentages);
      const minIndex = percentages.indexOf(highestPercentage);

      return minIndex

    } catch (error) {
      if(error.message == 'no ID'){
        return this.httpService.returnBadRequestException()
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getFeatProv(kota: number){
    try {
      const answers = await this.prisma.answer.findMany({
        where: {
          city_reference: {
              province_id: kota
          }
        },
        select: {
          sub_dimensi_x1_1: true,
          sub_dimensi_x1_2: true,
          sub_dimensi_x2_1: true,
          sub_dimensi_x2_2: true,
          sub_dimensi_x3_1: true,
          sub_dimensi_x3_2: true,
          sub_dimensi_x3_3: true,
          sub_dimensi_x4_1: true,
          sub_dimensi_x4_2: true,
          sub_dimensi_x5_1: true,
          sub_dimensi_x5_2: true
        }
      })
      if (answers.length === 0) {
        return []
      }

      const totals = {
        sub_dimensi_x1_1: 0,
        sub_dimensi_x1_2: 0,
        sub_dimensi_x2_1: 0,
        sub_dimensi_x2_2: 0,
        sub_dimensi_x3_1: 0,
        sub_dimensi_x3_2: 0,
        sub_dimensi_x3_3: 0,
        sub_dimensi_x4_1: 0,
        sub_dimensi_x4_2: 0,
        sub_dimensi_x4_3: 0,
        sub_dimensi_x5_1: 0,
        sub_dimensi_x5_2: 0,
      };

      answers.forEach(answer => {
        for (const key in answer) {
          if (key.startsWith('sub_dimensi_')) {
            totals[key] += answer[key];
          }
        }
      });
      
      const len = answers.length

      const percent_x1_1 = (totals.sub_dimensi_x1_1 / this.x1_1) * len;
      const percent_x1_2 = (totals.sub_dimensi_x1_2 / this.x1_2) * len;
      const percent_x2_1 = (totals.sub_dimensi_x2_1 / this.x2_1) * len;
      const percent_x2_2 = (totals.sub_dimensi_x2_2 / this.x2_2) * len;
      const percent_x3_1 = (totals.sub_dimensi_x3_1 / this.x3_1) * len;
      const percent_x3_2 = (totals.sub_dimensi_x3_2 / this.x3_2) * len;
      const percent_x3_3 = (totals.sub_dimensi_x3_3 / this.x3_3) * len;
      const percent_x4_1 = (totals.sub_dimensi_x4_1 / this.x4_1) * len;
      const percent_x4_2 = (totals.sub_dimensi_x4_2 / this.x4_2) * len;
      const percent_x4_3 = (totals.sub_dimensi_x4_3 / this.x4_3) * len;
      const percent_x5_1 = (totals.sub_dimensi_x5_1 / this.x5_1) * len;
      const percent_x5_2 = (totals.sub_dimensi_x5_2 / this.x5_2) * len;

      const percentages = [
        percent_x1_1,
        percent_x1_2,
        percent_x2_1,
        percent_x2_2,
        percent_x3_1,
        percent_x3_2,
        percent_x3_3,
        percent_x4_1,
        percent_x4_2,
        percent_x4_3,
        percent_x5_1,
        percent_x5_2,
      ];
  
      const highestPercentage = Math.min(...percentages);
      const minIndex = percentages.indexOf(highestPercentage);

      return minIndex

    } catch (error) {
      
      if(error.message == 'no ID'){
        return this.httpService.returnBadRequestException()
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getDimProv(kota: number){
    try {
      const answers = await this.prisma.answer.findMany({
        where: {
          city_reference: {
            province_id: kota
          }
        },
        select: {
          dimensi_1: true,
          dimensi_2: true,
          dimensi_3: true,
          dimensi_4: true,
          dimensi_5: true,
          
        }
      })
      if (answers.length === 0) {
        return []
      }
      const totals = {
          dimensi_1: 0,
          dimensi_2: 0,
          dimensi_3: 0,
          dimensi_4: 0,
          dimensi_5: 0,
      };

      answers.forEach(answer => {
        for (const key in answer) {
          if (key.startsWith('sub_dimensi_')) {
            totals[key] += answer[key];
          }
        }
      });
      
      const len = answers.length

      const percent_x1_1 = (totals.dimensi_1 / this.dim1) * len;
      const percent_x1_2 = (totals.dimensi_2 / this.dim2) * len;
      const percent_x2_1 = (totals.dimensi_3 / this.dim3) * len;
      const percent_x2_2 = (totals.dimensi_4 / this.dim4) * len;
      const percent_x3_1 = (totals.dimensi_5 / this.dim5) * len;

      const percentages = [
        percent_x1_1,
        percent_x1_2,
        percent_x2_1,
        percent_x2_2,
        percent_x3_1,
      ];
  
      const highestPercentage = Math.min(...percentages);
      const minIndex = percentages.indexOf(highestPercentage);

      return minIndex

    } catch (error) {
      if(error.message == 'no ID'){
        return this.httpService.returnBadRequestException()
      }
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async getQuartilProvince(provinceID: number){
      try {
        const answers = await this.prisma.answer.findMany({
          select: {
            total: true
          },
          where: {
            city_reference: {
              province_id: provinceID
            }
          }
        })
        if (answers.length === 0) {
          return []
        }
        const totals = answers.map(answer => answer.total);

        const max = Math.max(...totals);
        const min = Math.min(...totals);

        const q2 = (max-min)/2+min
        const q1 = (q2 - min)/2+min
        const q3 = (max - q2)/2 + q2

        const q1Count = totals.filter(total => total <= q1).length;
        const q2Count = totals.filter(total => total > q1 && total <= q2).length;
        const q3Count = totals.filter(total => total > q2 && total <= q3).length
        const q4Count = totals.filter(total => total > q3).length;

        const totalCount = totals.length;

        const q1Percentage = (q1Count / totalCount) * 100;
        const q2Percentage = (q2Count / totalCount) * 100;
        const q3Percentage = (q3Count / totalCount) * 100;
        const q4Percentage = (q4Count / totalCount) * 100;

        return {
          q1: q1Percentage,
          q2: q2Percentage,
          q3: q3Percentage,
          q4: q4Percentage
        };


      } catch (error) {
        return this.httpService.returnInternalServerError(this.tableName)
      }
  }

  async getQuartilCity(cityID: number){
    try {
      const answers = await this.prisma.answer.findMany({
        select: {
          total: true
        },
        where: {
          city_id: cityID
        }
      })
      if (answers.length === 0) {
        return []
      }
      const totals = answers.map(answer => answer.total);

      const max = Math.max(...totals);
      const min = Math.min(...totals);

      const q2 = (max-min)/2+min
      const q1 = (q2 - min)/2+min
      const q3 = (max - q2)/2 + q2

      const q1Count = totals.filter(total => total <= q1).length;
      const q2Count = totals.filter(total => total > q1 && total <= q2).length;
      const q3Count = totals.filter(total => total > q2 && total <= q3).length
      const q4Count = totals.filter(total => total > q3).length;

      const totalCount = totals.length;

      const q1Percentage = (q1Count / totalCount) * 100;
      const q2Percentage = (q2Count / totalCount) * 100;
      const q3Percentage = (q3Count / totalCount) * 100;
      const q4Percentage = (q4Count / totalCount) * 100;

      return {
        q1: q1Percentage,
        q2: q2Percentage,
        q3: q3Percentage,
        q4: q4Percentage
      };


    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
}
}
