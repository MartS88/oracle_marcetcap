import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Transactions} from './transactions-model';
import {CreateTransactionsDto} from './dto/create-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions)
    private readonly transactionsRepository: typeof Transactions,
  ) {}

  async addTransaction(portfolioId: number, dto: CreateTransactionsDto[]): Promise<Transactions[]> {
    const transactions: Transactions[] = [];

    for (const transactionDto of dto) {
      const {id} = transactionDto;

      try {
        const existingTransaction = await this.transactionsRepository.findOne({where: {id, portfolioId}});
        if (!existingTransaction) {
          const newTransaction = await this.transactionsRepository.create({portfolioId, ...transactionDto});
          transactions.push(newTransaction);
          return transactions;
        }
      } catch (error) {
        throw error;
      }
    }
  }
  async deleteTransactions(portfolioId: number, dto: CreateTransactionsDto): Promise<any> {
    try {
      const {coin} = dto;
      await this.transactionsRepository.destroy({where: {coin, portfolioId}});
    } catch (error) {
      throw error;
    }
  }

  async deleteTransaction(portfolioId: number, id: string): Promise<any> {
    try {
      const transaction = await this.transactionsRepository.findOne({where: {id}});
      if (!transaction) {
        throw new NotFoundException('Transaction with this id does not exist');
      }
      await transaction.destroy();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllTransactions(portfolioId: number): Promise<Transactions[]> {
    const transactions = await this.transactionsRepository.findAll({where: {portfolioId}});
    return transactions;
  }
}
