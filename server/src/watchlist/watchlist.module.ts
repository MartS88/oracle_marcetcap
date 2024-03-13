import {Module, forwardRef} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {WatchlistService} from './watchlist.service';
import {WatchlistController} from './watchlist.controller';
import {Portfolio} from '../portfolio/portfolio-model';
import {WatchList} from './watchlist-model';
import {CoinsModule} from '../coins/coins.module';

@Module({
  controllers: [WatchlistController],
  providers: [WatchlistService],
  imports: [SequelizeModule.forFeature([Portfolio, WatchList]), forwardRef(() => CoinsModule)],
})
export class WatchlistModule {}

// import {Module} from '@nestjs/common';
// import {SequelizeModule} from '@nestjs/sequelize';
// import {WatchlistService} from './watchlist.service';
// import {WatchlistController} from './watchlist.controller';
// import {Portfolio} from '../portfolio/portfolio-model';
// import {WatchList} from './watchlist-model';
//
// @Module({
//   providers: [WatchlistService, WatchList],
//   controllers: [WatchlistController],
//   imports: [SequelizeModule.forFeature([Portfolio, WatchList])],
// })
// export class WatchlistModule {}
