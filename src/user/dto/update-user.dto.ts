import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsExist } from 'src/validators/unique.validator';

export class UpdateUserDto {

    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: '1234567890', description: 'Phone number of the user' })
    @IsString({ message: 'Phone number must be a string' })
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({ example: 'male', description: 'Gender of the user' })
    @IsString({ message: 'Gender must be a string' })
    @IsNotEmpty()
    gender: string;

    @ApiProperty({ example: 'Acme Inc.', description: 'Company of the user' })
    @IsString({ message: 'Company must be a string' })
    @IsNotEmpty()
    company: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    @IsExist('User','email')
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password of the user' })
    @IsNotEmpty()
    password: string;

}
