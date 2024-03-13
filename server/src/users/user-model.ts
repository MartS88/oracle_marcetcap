import {Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {Portfolio} from '../portfolio/portfolio-model';
import {WatchList} from '../watchlist/watchlist-model';

interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique identifier'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'user@gmail.com', description: 'Email'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: 'user12345', description: 'Password'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];

  @HasMany(() => WatchList)
  watchlist: WatchList[];
}
