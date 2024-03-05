import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/http/http.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProvinceService {
 
  tableName: string = 'province'
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService){}

  async findAll() {
    try {
      return await this.prisma.province.findMany()
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async findCityByProvince(province: string) {
    try {
      const result: any = await this.httpService.findUniqueWithError(this.prisma.province.findUnique({
        where: {
          id : parseInt(province)
        },
        select: {
          id: true
        }
      }), this.tableName )

      return await this.prisma.city.findMany({
        where: {
          province_id: result.id
        }
      })
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

  async findCityDetail(id: string) {
    try {

      return await this.prisma.city.findUnique({
        where: {
          id: parseInt(id)
        }
      })
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }
}
