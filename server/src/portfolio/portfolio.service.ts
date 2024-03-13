import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {CreatePortfolioDto} from './dto/create-portfolio.dto';
import {Portfolio} from './portfolio-model';
import {InjectModel} from '@nestjs/sequelize';
import {UpdatePortfolioDto} from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio)
    private readonly portfolioRepository: typeof Portfolio,
  ) {}

  async createPortfolio(userId: number, createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    return this.portfolioRepository.create({
      ...createPortfolioDto,
      userId,
    });
  }

  async getPortfolioById(id: number): Promise<Portfolio[]> {
    const portfolio = await this.portfolioRepository.findAll({where: {id}});
    if (portfolio) {
      throw new NotFoundException('Portfolio with this ID does not exist');
    }
    return portfolio;
  }

  async getPortfolioByName(userId: number, name: string): Promise<Portfolio | null> {
    const portfolio = await this.portfolioRepository.findOne({where: {userId, name}});
    if (portfolio) {
      throw new NotFoundException('Portfolio with this name already exists for the user');
    }
    return portfolio;
  }

  async updatePortfolio(
    userId: number,
    portfolioId: number,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio | any> {
    try {
      const {newPortfolioName, newAvatar} = updatePortfolioDto;
      const portfolio = await this.portfolioRepository.findByPk(portfolioId);

      if (!portfolio) {
        throw new NotFoundException('Portfolio with this id does not exist');
      }

      if (newPortfolioName === undefined || newAvatar === undefined) {
        throw new BadRequestException('Portfolio name and avatar are required');
      }

      if (newPortfolioName !== portfolio.name) {
        portfolio.setDataValue('name', newPortfolioName);
      }

      if (newAvatar !== portfolio.avatar) {
        portfolio.avatar = newAvatar;
      }

      await portfolio.save();
    } catch (error) {
      console.error('Error updating portfolio:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating portfolio');
    }
  }

  async deletePortfolio(userId: number, portfolioName: string): Promise<any> {
    try {
      const portfolio = await this.portfolioRepository.findOne({where: {userId, name: portfolioName}});
      if (!portfolio) {
        return {success: false, message: 'Portfolio not found'};
      }
      await portfolio.destroy();
    } catch (error) {
      console.error('Error during portfolio deletion:', error);
    }
  }

  async getAllPortfolios(userId: number): Promise<Portfolio[]> {
    const portfolios = await this.portfolioRepository.findAll({where: {userId}});
    return portfolios;
  }
}
