import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {WatchList} from '../watchlist/watchlist-model';

@Table({tableName: 'coins'})
export class Coins extends Model<Coins> {

  @ForeignKey(() => WatchList)
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.INTEGER})
  userId: number;

  @Column({type: DataType.STRING, allowNull: false})
  symbol: string;

  @Column({type: DataType.STRING, allowNull: false})
  coin: string;
}
