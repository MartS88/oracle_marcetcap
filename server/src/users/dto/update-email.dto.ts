import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class UpdateEmailDto {
  @ApiProperty({example: 'user@gmail.com', description: 'Old Email'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @IsEmail({}, {message: 'Not correct email'})
  readonly email: string;

  @ApiProperty({example: 'newuser@gmail.com', description: 'New Email'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @IsEmail({}, {message: 'Not correct email'})
  readonly newEmail: string;
}
