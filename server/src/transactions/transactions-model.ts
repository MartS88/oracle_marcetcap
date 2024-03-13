import {Column, DataType, Model, Table, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Portfolio} from '../portfolio/portfolio-model';
@Table({tableName: 'transactions'})
export class Transactions extends Model<Transactions> {
  @Column({type: DataType.STRING, unique: true, primaryKey: true})
  id: string;

  @Column({type: DataType.STRING, allowNull: false})
  coin: string;

  @Column({type: DataType.STRING, allowNull: false})
  coinSymbol: string;

  @Column({type: DataType.FLOAT, allowNull: false})
  quantity: number;

  @Column({type: DataType.FLOAT, allowNull: false})
  price: number;

  @Column({type: DataType.DOUBLE, allowNull: false})
  averagePrice: number;

  @Column({type: DataType.DOUBLE, allowNull: false})
  totalSpent: number;

  @Column({type: DataType.DATE})
  date: Date;

  @Column({type: DataType.TEXT})
  note: string;

  @Column({type: DataType.STRING, allowNull: false})
  transactionType: string;

  @ForeignKey(() => Portfolio)
  @Column({type: DataType.INTEGER, allowNull: false})
  portfolioId: number;

  @BelongsTo(() => Portfolio, {onDelete: 'CASCADE'})
  portfolio: Portfolio;
}
