import {Module, forwardRef} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {CoinsService} from './coins.service';
import {CoinsController} from './coins.controller';
import {Coins} from './coins-model';
import {WatchlistModule} from '../watchlist/watchlist.module';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService],
  imports: [SequelizeModule.forFeature([Coins]), forwardRef(() => WatchlistModule)],
  exports: [CoinsService],
})
export class CoinsModule {}
