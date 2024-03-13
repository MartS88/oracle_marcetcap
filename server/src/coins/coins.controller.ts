import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {CoinsService} from './coins.service';
import {CreateCoinDto} from './dto/create-coin.dto';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Post(':userId/add-coin')
  @ApiOperation({summary: 'Add coin'})
  @ApiResponse({status: 200, description: 'Coin added to watchlist successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async addCoin(@Param('userId') userId: number, @Body() dto: CreateCoinDto[]) {
    try {
      const coins = await this.coinsService.addOneCoin(userId, dto);

      return {
        success: true,
        coins,
        message: 'Coins added successfully',
      };
    } catch (error) {
      console.error('Error adding coins:', error);
      return {
        success: false,
        error: error.response ? error.response.message : 'Internal Server Error',
        message: 'Failed to add coins',
      };
    }
  }

  @Post(':userId/add-coins')
  @ApiOperation({summary: 'Add coins'})
  @ApiResponse({status: 200, description: 'Coins added to watchlist successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async addCoins(@Param('userId') userId: number, @Body() dto: CreateCoinDto[]) {
    try {
      const coins = await this.coinsService.addCoins(userId, dto);

      return {
        success: true,
        coins,
        message: 'Coins added successfully',
      };
    } catch (error) {
      console.error('Error adding coins:', error);
      return {
        success: false,
        error: error.response ? error.response.message : 'Internal Server Error',
        message: 'Failed to add coins',
      };
    }
  }
  @Post(':userId/delete-coin')
  @ApiOperation({summary: 'Add coin'})
  @ApiResponse({status: 200, description: 'Coins watchlist updated successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async deleteCoin(@Param('userId') userId: number, @Body() dto: CreateCoinDto[]) {
    try {
      const coins = await this.coinsService.deleteCoin(userId, dto);

      return {
        success: true,
        coins,
        message: 'Coins added successfully',
      };
    } catch (error) {
      console.error('Error adding coins:', error);
      return {
        success: false,
        error: error.response ? error.response.message : 'Internal Server Error',
        message: 'Failed to add coins',
      };
    }
  }
  @Get(':userId')
  @ApiOperation({summary: 'Get coins list'})
  @ApiResponse({status: 200, description: 'Coins lis get successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async getCoins(@Param('userId') userId: number) {
    try {
      const watchlist = await this.coinsService.getCoins(userId);
      return {
        success: true,
        watchlist,
        message: 'Coins list fetched successfully',
      };
    } catch (error) {
      console.error('Failed to fetch coins list', error);
    }
  }
}
