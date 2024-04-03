import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Redirect } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly mailerService: MailerService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: FastifyReply) {
    return this.userService.login(loginUserDto, response);
  }

  @Post('register')
  register(@Body()  createUserDto: CreateUserDto, @Res({ passthrough: true }) response: FastifyReply) {
    return this.userService.register(createUserDto, response);
  }

  @Get('')
  findAll() {
    return this.userService.findAll();
  }
  
  @Get('/decode')
  decode(@Query('token') token: string) {
    return this.userService.decodeToken(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('email')
  email(){
    return this.userService.sendUserConfirmation(6, 'hnsindrawan@gmail.com')
  }

  @Patch('confirm/:id')
  confirm(@Param('id') id: string){
    return this.userService.confirm(id)
  }
}
