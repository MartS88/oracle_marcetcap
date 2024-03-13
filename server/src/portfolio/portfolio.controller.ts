import {Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post} from '@nestjs/common';

import {CreatePortfolioDto} from './dto/create-portfolio.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PortfolioService} from './portfolio.service';
import {UpdatePortfolioDto} from './dto/update-portfolio.dto';

@ApiTags('Portfolios')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post(':userId/create')
  @ApiOperation({summary: 'Create Portfolio'})
  @ApiResponse({status: 200, description: 'Portfolio created successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  async createPortfolio(@Param('userId') userId: number, @Body() createPortfolioDto: CreatePortfolioDto) {
    try {
      const existingPortfolio = await this.portfolioService.getPortfolioByName(userId, createPortfolioDto.name);

      if (existingPortfolio) {
        return {
          success: false,
          error: 'PortfolioAlreadyExists',
          message: 'Portfolio with this name already exists for the user',
        };
      }
      const portfolio = await this.portfolioService.createPortfolio(userId, createPortfolioDto);

      return {success: true, portfolio, message: 'Portfolio created successfully'};
    } catch (error) {
      console.error('Error during portfolio creation:', error);
      return {success: false, error: error.message, message: 'Failed to create portfolio'};
    }
  }
  @Post(':userId/update-portfolio/:portfolioId')
  @ApiOperation({summary: 'Update Portfolio'})
  @ApiResponse({status: 200, description: 'Portfolio updated successfully'})
  @ApiResponse({status: 404, description: 'Portfolio not found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async updatePortfolio(
    @Param('userId') userId: number,
    @Param('portfolioId') portfolioId: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<any> {
    try {
      const portfolio = await this.portfolioService.updatePortfolio(userId, portfolioId, updatePortfolioDto);
      return {portfolio, message: 'Portfolio was successfully updated', statusCode: HttpStatus.OK};
    } catch (error) {
      console.error('Error in updating portfolio:', error);
      return {
        error: error.message,
        message: 'Failed to update portfolio',
        statusCode: error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
  @Get(':userId/portfolios')
  @ApiOperation({summary: 'Get All Portfolios'})
  @ApiResponse({status: 200, description: 'Portfolios fetched successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async getAllPortfolios(@Param('userId') userId: number) {
    try {
      const portfolios = await this.portfolioService.getAllPortfolios(userId);
      return {success: true, portfolios, message: 'Portfolios fetched successfully'};
    } catch (error) {
      console.error('Error', error);
      return {success: false, error: error.message, message: 'Failed to fetch portfolios data'};
    }
  }

  @Delete(':userId/:portfolioName/delete')
  @ApiOperation({summary: 'Delete Portfolio'})
  @ApiResponse({status: 200, description: 'Portfolio deleted successfully'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async deletePortfolio(@Param('userId') userId: number, @Param('portfolioName') portfolioName: string) {
    try {
      const portfolio = await this.portfolioService.deletePortfolio(userId, portfolioName);
      return {success: true, portfolio, message: 'Portfolio deleted successfully'};
    } catch (error) {
      console.error('Error during portfolio deletion:', error);
      return {success: false, error: error.message, message: 'Failed to delete portfolio'};
    }
  }
}
