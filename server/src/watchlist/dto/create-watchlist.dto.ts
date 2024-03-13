import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateWatchlistDto {
  @ApiProperty({example: '1', description: 'userId'})
  @IsString({message: 'Value must be number'})
  @IsNotEmpty()
  readonly userId: number;
}
