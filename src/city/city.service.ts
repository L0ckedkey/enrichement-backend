import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from 'src/http/http.service';

@Injectable()
export class CityService {

  tableName: string = 'city'
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService){}

  async findOne(id: number) {
    try {
      return this.prisma.city.findUnique({
        where: {
          id: id
        },select: {
          id: true,
          name: true
        }
      })
    } catch (error) {
      return this.httpService.returnInternalServerError(this.tableName)
    }
  }

}
