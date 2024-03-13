import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsNumber, IsArray} from 'class-validator';

export class CreateCoinDto {
  @ApiProperty({example: 'Bitcoin', description: 'Coin name'})
  @IsString({message: 'Value must be a string'})
  @IsNotEmpty()
  readonly coin: string;

  @ApiProperty({example: 'Btc', description: 'Coin ID'})
  @IsString({message: 'Value must be a string'})
  @IsNotEmpty()
  readonly symbol: string;
}
