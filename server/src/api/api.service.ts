import {Injectable, NotFoundException} from '@nestjs/common';

const sdk = require('api')('@coinstatsopenapi/v1.0#8fc3kgx93i1locyjj6r');

@Injectable()
export class ApiService {
  async getCoinList(limit: string): Promise<any[]> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = await sdk.coinController_coinList({limit: limit.toString()});
      return response;
    } catch (error) {
      console.error('Error fetching coin list:', error);
      throw new Error('Unable to fetch coin list');
    }
  }

  async getCoinById(coinId: string): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = await sdk.coinController_coinItem({coinId});
      return response;
    } catch (error) {
      if (error.statusCode === 404) {
        throw new NotFoundException(`Coin with ID ${coinId} not found`);
      } else {
        console.error(`Error fetching coin with ID ${coinId}:`, error);
        throw new Error('Unable to fetch coin details');
      }
    }
  }

  async getMarketsData(): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = await sdk.marketController_marketCap();
      return response;
    } catch (error) {
      console.error('Error fetching Markets Data', error);
      throw new Error('Unable to fetch Markets Data');
    }
  }

  async getTickersExchanges(): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = await sdk.tickerController_getSupportedExchanges();
      return response;
    } catch (error) {
      console.error('Error fetching Markets Data', error);
      throw new Error('Unable to fetch Markets Data');
    }
  }

  async getBlockchainsList(): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = sdk.walletController_blockchainList();
      return response;
    } catch (error) {
      console.error('Error fetching Wallet Data', error);
      throw new Error('Unable to fetch Wallet Data');
    }
  }

  async getWalletBalance(address: string, blockchain: string): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = await sdk.walletController_walletBalance({
        address: address,
        connectionId: blockchain,
      });
      return response;
    } catch (error) {
      console.error('Error fetching wallet balance data', error);
      if (error.response && error.response.status === 404) {
        throw new Error('Wallet not found');
      } else {
        throw new Error('Unable to fetch wallet data');
      }
    }
  }

  async getWalletTransactions(): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = sdk.walletController_walletGetTransactions();
      return response;
    } catch (error) {
      console.error('Error fetching wallet transactions data', error);
      throw new Error('Unable to fetch wallet data');
    }
  }

  async getNft(limit: string): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = sdk.nftController_trendingNftList({limit: limit.toString()});
      return response;
    } catch (error) {
      console.error('Error fetching nft data', error);
      throw new Error('Unable to fetch nft data');
    }
  }

  async getNews(limit: string): Promise<any> {
    try {
      sdk.auth('7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc=');
      const response = sdk.newsController_getNewsList({limit: limit.toString()});
      return response;
    } catch (error) {
      console.error('Error fetching news data', error);
      throw new Error('Unable to fetch news data');
    }
  }
}
