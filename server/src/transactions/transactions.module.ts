import {forwardRef, Module} from '@nestjs/common';
import {TransactionsService} from './transactions.service';
import {TransactionsController} from './transactions.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Transactions} from './transactions-model';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [SequelizeModule.forFeature([Transactions]), forwardRef(() => TransactionsModule)],
  exports: [TransactionsService],
})
export class TransactionsModule {}
