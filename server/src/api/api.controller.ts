import {Controller, Get, NotFoundException, Param, Query} from '@nestjs/common';
import {ApiService} from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/coins')
  async getCoinsList(@Query('limit') limit?: string): Promise<any> {
    try {
      const coinsList = await this.apiService.getCoinList(limit || '1000');
      return coinsList;
    } catch (error) {
      return {error: error.message};
    }
  }

  @Get('/coins/:coinId')
  async getCoinById(@Param('coinId') coinId: string): Promise<any> {
    try {
      const coin = await this.apiService.getCoinById(coinId);
      return coin;
    } catch (error) {
      return {error: error.message};
    }
  }
  @Get('/exchanges')
  async getTicketsExchanges(): Promise<any> {
    try {
      const exchanges = await this.apiService.getTickersExchanges();
      return exchanges;
    } catch (error) {
      return {error: error.message};
    }
  }
  @Get('/markets')
  async getMarketsData(): Promise<any> {
    try {
      const markets = await this.apiService.getMarketsData();
      return markets;
    } catch (error) {
      return {error: error.message};
    }
  }

  @Get('/blockchains')
  async getBlockchainsList(): Promise<any> {
    try {
      const blockchainsList = await this.apiService.getBlockchainsList();
      return blockchainsList;
    } catch (error) {
      return {error: error.message};
    }
  }

  @Get('wallet/:address/:blockchain')
  async getWalletBalance(@Param('address') address: string, @Param('blockchain') blockchain: string): Promise<any> {
    try {
      const wallet = await this.apiService.getWalletBalance(address, blockchain);
      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }
      return wallet;
    } catch (error) {
      return {error: error.message};
    }
  }

  @Get('/wallet/transactions')
  async getWalletTransactions(): Promise<any> {
    try {
      const wallet = await this.apiService.getWalletTransactions();
      return wallet;
    } catch (error) {
      return {error: error.message};
    }
  }

  @Get('/nft')
  async getNft(@Query('limit') limit?: string): Promise<any> {
    try {
      const nft = await this.apiService.getNft(limit || '100');
      return nft;
    } catch (error) {
      return {error: error.message};
    }
  }

  @Get('/news')
  async getNews(@Query('limit') limit?: string): Promise<any> {
    try {
      const news = await this.apiService.getNews(limit || '100');
      return news;
    } catch (error) {
      return {error: error.message};
    }
  }
}
