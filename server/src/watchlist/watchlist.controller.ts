import {Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {WatchlistService} from './watchlist.service';
import {CreateWatchlistDto} from './dto/create-watchlist.dto';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {User} from '../users/user-model';
import {WatchList} from './watchlist-model';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchListService: WatchlistService) {}

  @Post(':userId/watchlist-create')
  @ApiOperation({summary: 'Create watchlist'})
  @ApiResponse({status: 200, description: 'Watchlist updated successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async createWatchlist(@Param('userId') userId: number, @Body() dto: CreateWatchlistDto) {
    try {
      const watchListItems = await this.watchListService.createWatchlist(userId, dto);

      return {
        success: true,
        watchList: watchListItems,
        message: 'Watchlist created successfully',
      };
    } catch (error) {
      console.error('Error during watchlist creation:', error);

      return {
        success: false,
        error: error.response ? error.response.message : 'Internal Server Error',
        message: 'Failed to create watchlist',
      };
    }
  }

  @Get(':userId')
  @ApiOperation({summary: 'Get watchlist'})
  @ApiResponse({status: 200, description: 'Watchlist get successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async getWatchList(@Param('userId') userId: number) {
    try {
      const watchlist = await this.watchListService.getWatchListArray(userId);
      return {
        success: true,
        watchList: watchlist,
        message: 'Watchlist fetched successfully',
      };
    } catch (error) {
      console.error('Failed to fetch watchlist', error);
    }
  }
}
