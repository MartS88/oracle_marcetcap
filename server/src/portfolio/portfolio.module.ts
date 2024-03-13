import {forwardRef, Module} from '@nestjs/common';
import {PortfolioService} from './portfolio.service';
import {PortfolioController} from './portfolio.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Portfolio} from './portfolio-model';
import {Transactions} from '../transactions/transactions-model';
import {TransactionsModule} from '../transactions/transactions.module';

@Module({
  providers: [PortfolioService],
  controllers: [PortfolioController],
  imports: [SequelizeModule.forFeature([Portfolio, Transactions]), forwardRef(() => TransactionsModule)],
  exports: [PortfolioService],
})
export class PortfolioModule {}
