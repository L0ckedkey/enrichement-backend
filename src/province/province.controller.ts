import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('province')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  findAll() {
    return this.provinceService.findAll();
  }

  @Get('/city/:province')
  findCityByProvince(@Param('province') province: string) {
    return this.provinceService.findCityByProvince(province);
  }
}
