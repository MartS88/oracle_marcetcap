import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';

export class UpdatePortfolioDto {
  @ApiProperty({example: 'My Portfolio', description: 'Portfolio name'})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({example: 'portfolio.jpg', description: 'User Avatar'})
  @IsString()
  @IsNotEmpty()
  readonly avatar: string;

  @ApiProperty({example: 'My Portfolio', description: 'New Portfolio name'})
  @IsString()
  @IsNotEmpty()
  readonly newPortfolioName: string;

  @ApiProperty({example: 'portfolio.jpg', description: 'New User Avatar'})
  @IsString()
  @IsNotEmpty()
  readonly newAvatar: string;
}
