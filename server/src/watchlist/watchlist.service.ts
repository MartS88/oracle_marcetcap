import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {WatchList} from './watchlist-model';
import {CreateWatchlistDto} from './dto/create-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(WatchList)
    private readonly watchListRepository: typeof WatchList,
  ) {}

  async createWatchlist(userId: number, dto: CreateWatchlistDto): Promise<WatchList> {
    const existingWatchlist = await this.watchListRepository.findOne({where: {userId}});

    if (!existingWatchlist) {
      const newWatchlist = await this.watchListRepository.create(dto);
      return newWatchlist;
    } else {
      return existingWatchlist;
    }
  }

  async getWatchListArray(userId: number): Promise<WatchList[]> {
    const watchlist = await this.watchListRepository.findAll({where: {userId}});
    return watchlist;
  }
}

// async createWatchlist(userId: number, watchListDtoArray: CreateWatchlistDto[]): Promise<WatchList[]> {
//   const createdWatchlistArray = await Promise.all(
//      watchListDtoArray.map(async (watchListDto) => {
//        const {coinName, coinId} = watchListDto;
//        const existingWatchlist = await this.watchListRepository.findOne({where: {userId, coinId}});
//
//        if (existingWatchlist) {
//          existingWatchlist.coinName = coinName;
//          await existingWatchlist.save();
//          return existingWatchlist;
//        } else {
//          const createdWatchlist = await this.addToWatchlist(userId, coinId, coinName);
//          return createdWatchlist;
//        }
//      }),
//   );
//
//   const existingWatchlists = await this.watchListRepository.findAll({where: {userId}});
//
//   for (const existingWatchlist of existingWatchlists) {
//   const coinIdExistsInNewList = watchListDtoArray.some((dto) => dto.coinId === existingWatchlist.coinId);
//
//   if (!coinIdExistsInNewList) {
//     await existingWatchlist.destroy();
//   }
// }
//
// return createdWatchlistArray;
// }
//
// async addToWatchlist(userId: number, coinId: string, coinName: string): Promise<WatchList> {
//   const existingWatchlist = await this.watchListRepository.findOne({where: {userId, coinId}});
//
//   if (existingWatchlist) {
//     console.log('coin WAS DELETED');
//     await existingWatchlist.destroy();
//   }
//
//   const createdWatchlist = await this.watchListRepository.create({userId, coinName, coinId});
//   return createdWatchlist;
// }
//
// async getWatchListArray(userId: number): Promise<WatchList[]> {
//   const watchlist = await this.watchListRepository.findAll({where: {userId}});
//   return watchlist;
// }
