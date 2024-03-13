import {Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {TransactionsService} from './transactions.service';
import {CreateTransactionsDto} from './dto/create-transactions.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':portfolioId/add-transaction')
  @ApiOperation({summary: 'Add transaction'})
  @ApiResponse({status: 200, description: 'Transaction added to portfolio successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async addTransaction(@Param('portfolioId') portfolioId: number, @Body() dto: CreateTransactionsDto[]) {
    try {
      const coins = await this.transactionsService.addTransaction(portfolioId, dto);

      return {
        success: true,
        coins,
        message: 'Transaction added successfully',
      };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return {
        success: false,
        error: error.response ? error.response.message : 'Internal Server Error',
        message: 'Failed to add transaction',
      };
    }
  }
  @Post(':portfolioId/delete-transactions')
  @ApiOperation({summary: 'Add transaction'})
  @ApiResponse({status: 200, description: 'Transaction added to portfolio successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async deleteTransactions(@Param('portfolioId') portfolioId: number, @Body() dto: CreateTransactionsDto) {
    try {
      const transactions = await this.transactionsService.deleteTransactions(portfolioId, dto);
      return {
        success: true,
        transactions,
        message: 'Transaction deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return {
        success: false,
        error: error.response ? error.response.message : 'Internal Server Error',
        message: 'Failed to delete transaction',
      };
    }
  }

  @Post(':portfolioId/delete-transaction/:id')
  @ApiOperation({summary: 'Find transaction'})
  @ApiResponse({status: 200, description: 'Transaction was found successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async findTransaction(@Param('portfolioId') portfolioId: number, @Param('id') id: string): Promise<any> {
    try {
      const transaction = await this.transactionsService.deleteTransaction(portfolioId, id);
      return transaction;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Get(':portfolioId')
  @ApiOperation({summary: 'Get transactions list'})
  @ApiResponse({status: 200, description: 'Transactions list get successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async getCoins(@Param('portfolioId') portfolioId: number) {
    try {
      const transactions = await this.transactionsService.getAllTransactions(portfolioId);
      return {
        success: true,
        transactions,
        message: 'Transactions list fetched successfully',
      };
    } catch (error) {
      console.error('Failed to fetch transactions list', error);
    }
  }
}
