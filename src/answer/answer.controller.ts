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
}
