import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({example: 'My Portfolio', description: 'Portfolio name'})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({example: 'portfolio.jpg', description: 'User Avatar'})
  @IsString()
  @IsNotEmpty()
  readonly avatar: string;
}
