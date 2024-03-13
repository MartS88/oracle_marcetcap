import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateCoinDto} from './dto/create-coin.dto';
import {Coins} from './coins-model';

@Injectable()
export class CoinsService {
  constructor(
    @InjectModel(Coins)
    private readonly coinsRepository: typeof Coins,
  ) {}

  async addOneCoin(userId: number, dto: CreateCoinDto[]): Promise<Coins[]> {
    const coins: Coins[] = [];

    for (const coinDto of dto) {
      const { symbol } = coinDto;

      try {
        let existingCoin = await this.coinsRepository.findOne({ where: { symbol, userId } });

        if (!existingCoin) {
          const newCoin = await this.coinsRepository.create({ userId, ...coinDto });
          coins.push(newCoin);
        } else {
          await this.deleteCoins(userId, [coinDto]);
          existingCoin.set({ userId, ...coinDto });
          const updatedCoin = await existingCoin.save();
          coins.push(updatedCoin);
        }
      } catch (error) {
        throw error;
      }
    }

    return coins;
  }


  async addCoins(userId: number, dto: CreateCoinDto[]): Promise<Coins[]> {
    try {
      await this.coinsRepository.destroy({where: {userId}});
      const newCoins: Coins[] = await Promise.all(
        dto.map((coinDto) => this.coinsRepository.create({userId, ...coinDto})),
      );
      return newCoins;
    } catch (error) {
      console.error(`Failed to add coins for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async deleteCoins(userId: number, dto: CreateCoinDto[]): Promise<void> {
    const {symbol} = dto[0];
    const coin = await this.coinsRepository.findOne({where: {symbol, userId}});
    await coin.destroy();
  }

  async deleteCoin(userId: number, dto: CreateCoinDto[]): Promise<void> {
    for (const coinDto of dto) {
      const {symbol} = coinDto;
      const coin = await this.coinsRepository.findOne({where: {symbol, userId}});

      if (coin) {
        await coin.destroy();
      }
    }
  }

  async getCoins(userId: number): Promise<Coins[]> {
    const coins = await this.coinsRepository.findAll({where: {userId}});
    return coins;
  }
}
