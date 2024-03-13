import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Matches, Length} from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({example: 'user@gmail.com', description: 'Email'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @IsEmail({}, {message: 'Not correct email'})
  readonly email: string;

  @ApiProperty({example: '12345', description: 'Password'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @Length(5, 16, {message: 'Password must contain from 5 to 16 characters'})
  readonly newPassword: string;
}
