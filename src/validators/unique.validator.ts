import {
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
  } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
  
  export function IsUnique(table: string, column: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsUnique',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [{ table, column }],
        validator: IsUniqueValidator,
      });
    };
  }

  export function IsExist(table: string, column: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsExists',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [{ table, column }],
        validator: IsExistValidator,
      });
    };
  }

@Injectable()
@ValidatorConstraint({name:'IsUnique', async: true }) // Keep the async validator constraint
export class IsUniqueValidator implements ValidatorConstraintInterface {

  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService into the constructor

  async validate(columnValue: any, args: ValidationArguments) {
    const params = args.constraints[0] as { table: string, column: string };
    const { table, column } = params;

    try {
      const result = await this.prisma[table].findFirst({
        where: {
          [column]: columnValue,
          deletedAt: null
        }
      });

      return !result;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const params = args.constraints[0] as { table: string, column: string };
    const { column } = params;
    console.log(params.table + " " + params.column )
    return column + ` must be unique.`;
  }
}

@Injectable()
@ValidatorConstraint({name:'IsExist', async: true }) // Keep the async validator constraint
export class IsExistValidator implements ValidatorConstraintInterface {

  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService into the constructor

  async validate(columnValue: any, args: ValidationArguments) {
    const params = args.constraints[0] as { table: string, column: string };
    const { table, column } = params;

    try {
      const result = await this.prisma[table].findFirst({
        where: {
          [column]: columnValue,
          deletedAt: null
        }
      });
      
      if(result !== null){
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const params = args.constraints[0] as { table: string, column: string };
    const { column } = params;
    return column + ` must be exist.`;
  }
}
