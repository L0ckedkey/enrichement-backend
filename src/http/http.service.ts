import { HttpStatus, Injectable, BadRequestException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HttpService {

  constructor(private prisma: PrismaService){}
  returnHTTPOK(tableName: string, action: string) {

    if(action.trim().toLowerCase() === "update"){
      return {
        code: 201,
        message: 'succesfully update ' + tableName.trim()
      }
    }else if(action.trim().toLowerCase() === "delete"){
      return {
        code: 201,
        message: 'succesfully delete ' + tableName.trim()
      }
    }else if(action.trim().toLowerCase() === "create"){
      return {
        code: 201,
        message: 'succesfully create ' + tableName.trim()
      }
    }else if(action.trim().toLowerCase() === "login"){
      return {
        code: 200,
        message: 'login success'
      }
    }else if(action.trim().toLowerCase() === "register"){
      return {
        code: 201,
        message: 'succesfully create user'
      }
    }else{
      return{
        message: "HAYOO ISI YANG ANEH ANEH YA"
      }
    } 
  }

  sendError(message: string, tableName: string){
    if(message.includes('not found')){
      return this.objectNotFound(tableName);
    }else{
      return this.returnInternalServerError(tableName)
    }
  }

  returnBadRequestException(desc: string = "Something wrong with user inputs") {
    throw new BadRequestException(desc);
  }

  forbiddenAccess(desc: string){
    throw new HttpException(desc, HttpStatus.FORBIDDEN)
  }

  returnInternalServerError(tableName: string){
    throw new InternalServerErrorException("Cannot process action on " + tableName.trim() + " server failure")
  }

  objectNotFound(tableName: string){
    throw new BadRequestException(tableName.trim() + " not found")
  }

  async findUniqueWithError<T>(query: Promise<T | null>, tableName: string): Promise<T> {
    const result = await query;
  
    if (result === null) {
      this.objectNotFound(tableName);
    }
  
    return result as T;
  }
}