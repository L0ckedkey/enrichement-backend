import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }


  @Get('sorted')
  sorted(){
    return this.answerService.sorted()
  }

  @Get('average/:provinceId')
  average(@Param('provinceId') province: string){
    return this.answerService.average(+province)
  }

  @Get('highest-average-province')
  highestAverage(){
    return this.answerService.highestAverageProvince()
  }

  @Get('highest-average-city')
  highestAverageCity(){
    return this.answerService.highestAverageCity()
  }

  // @Get('highest-lowest-province')
  // highestLowestProvince(){
  //   return this.answerService.highesLowestProvince()
  // }

  // @Get('highest-lowest-city')
  // highestLowestCity(){
  //   return this.answerService.highesLowestCity()
  // }

  @Get()
  findAll(){
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.answerService.findOneAns(+id);
  }


  @Get('/user/:id')
  findAnswer(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Get('/city/:city')
  findAnswerByCity(@Param('city') city: string) {
    return this.answerService.findByCity(+city);
  }

  @Get('/province/:province')
  findAnswerByProvince(@Param('province') province: string) {
    return this.answerService.findByProvince(province);
  }

  @Get('/feat-city-ans/:city')
  getAnsCityFeature(@Param('city') city: string) {
    return this.answerService.getFeatCity(+city);
  }

  @Get('/dim-city-ans/:city')
  getAnsCityDim(@Param('city') city: string) {
    return this.answerService.getDimCity(+city);
  }

  @Get('/feat-prov-ans/:city')
  getAnsProvFeature(@Param('city') city: string) {
    return this.answerService.getFeatProv(+city);
  }

  @Get('/dim-prov-ans/:city')
  getAnsProvDim(@Param('city') city: string) {
    return this.answerService.getDimProv(+city);
  }

  @Get('/percent-province/:province')
  getQuartileProvince(@Param('province') province: string) {
    return this.answerService.getQuartilProvince(+province);
  }

  @Get('/percent-city/:city')
  getQuartileCity(@Param('city') city: string) {
    return this.answerService.getQuartilCity(+city);
  }
}
