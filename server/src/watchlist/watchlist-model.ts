import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from '../users/user-model';
import {Coins} from '../coins/coins-model';
import {AssociationOptions} from 'sequelize/types';

@Table({tableName: 'watchlist'})
export class WatchList extends Model<WatchList> {
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, primaryKey: true})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Coins, {foreignKey: 'userId', targetKey: 'id'} as AssociationOptions)
  coins: Coins[];
}
