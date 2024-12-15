import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class AddLocationDto {
    @IsString()
    @MinLength(2, { message: 'City must have atleast 2 characters.' })
    @IsNotEmpty()
    city: string
}