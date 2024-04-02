import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }
}
