import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { IsExist, IsUnique } from 'src/validators/unique.validator';

export class CreateUserDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    @IsExist('User','email')
    email: string;
}
