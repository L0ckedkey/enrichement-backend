import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { IsExist } from 'src/validators/unique.validator';

export class LoginUserDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    @IsExist('User', 'email')
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password of the user' })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty()
    password: string;
}
