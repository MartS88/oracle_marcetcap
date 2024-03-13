import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsNumber, IsDate} from 'class-validator';

export class CreateTransactionsDto {
  @ApiProperty({example: 'My portfolio', description: 'Name of the portfolio'})
  @IsString({message: 'Value must be a string'})
  @IsNotEmpty()
  readonly portfolioName: string;

  @ApiProperty({example: 'Bitcoin', description: 'Name of the cryptocurrency'})
  @IsString({message: 'Value must be a string'})
  @IsNotEmpty()
  readonly coin: string;

  @ApiProperty({example: 'BTC', description: 'Symbol of the cryptocurrency'})
  @IsString({message: 'Value must be a string'})
  @IsNotEmpty()
  readonly coinSymbol: string;

  @ApiProperty({example: '28d51f1d-cc5f-4b08-b42d-ef7e5a449904', description: 'Unique identifier for the transaction'})
  @IsString({message: 'Value must be a string'})
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({example: '1', description: 'Quantity of coin'})
  @IsNumber({}, {message: 'Value must be a number'})
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({example: '30.000', description: 'Price of coin'})
  @IsNumber({}, {message: 'Value must be a number'})
  @IsNotEmpty()
  price: number;

  @ApiProperty({example: '30.000', description: 'Average Price of coin'})
  @IsNumber({}, {message: 'Value must be a number'})
  @IsNotEmpty()
  averagePrice: number;

  @ApiProperty({example: '30.000', description: 'Total money spent'})
  @IsNumber({}, {message: 'Value must be a number'})
  @IsNotEmpty()
  totalSpent: number;

  @ApiProperty({
    example: 'Wed Feb 07 2024 09:20:01 GMT+0200 (Eastern European Standard Time)',
    description: 'Date when user bought coin',
  })
  @IsDate({message: 'Value must be a date'})
  date: Date;

  @ApiProperty({example: 'My first coin', description: 'Note about a coin'})
  @IsString({message: 'Value must be a string'})
  note: string;

  @ApiProperty({example: 'Buy', description: 'Type of transaction'})
  @IsString({message: 'Value must be a string'})
  @IsNotEmpty()
  transactionType: string;
}
