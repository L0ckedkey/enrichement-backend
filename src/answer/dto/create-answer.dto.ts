import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { IsExist } from 'src/validators/unique.validator';

export class CreateAnswerDto {
    @ApiProperty({ example: 1, description: 'The user ID' })
    @IsInt()
    @IsExist('user', 'id')
    user_id: number;

    @ApiProperty({ example: 1, description: 'The city ID' })
    @IsInt()
    @IsExist('city', 'id')
    city_id: number;

    @ApiProperty({ example: 'Some answer', description: 'The user\'s answer' })
    @IsString({ message: 'Answer must be a string' })
    answer: string;

    @ApiProperty({ example: 'Some answer', description: 'The user\'s answer' })
    @IsString({ message: 'Profile must be a string' })
    profile: string;
}
