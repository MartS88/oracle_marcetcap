import {Column, DataType, Model, Table, ForeignKey, HasMany, BelongsTo} from 'sequelize-typescript';
import {User} from '../users/user-model';
import {Transactions} from '../transactions/transactions-model';

@Table({tableName: 'portfolios'})
export class Portfolio extends Model<Portfolio> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.STRING, allowNull: false})
  avatar: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @HasMany(() => Transactions)
  transactions: Transactions[];

  @BelongsTo(() => User)
  user: User;
}
