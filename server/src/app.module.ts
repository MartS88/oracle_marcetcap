import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {ConfigModule} from '@nestjs/config';
import * as process from 'process';
import {User} from './users/user-model';
import {SequelizeModule} from '@nestjs/sequelize';
import {ApiModule} from './api/api.module';
import {AuthModule} from './auth/auth.module';
import {PortfolioModule} from './portfolio/portfolio.module';
import {Portfolio} from './portfolio/portfolio-model';
import {WatchlistModule} from './watchlist/watchlist.module';
import {WatchList} from './watchlist/watchlist-model';
import {Coins} from './coins/coins-model';
import {CoinsModule} from './coins/coins.module';
import {Transactions} from './transactions/transactions-model';
import {TransactionsModule} from './transactions/transactions.module';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Portfolio, WatchList, Coins, Transactions],
      autoLoadModels: true,
    }),
    UsersModule,
    ApiModule,
    AuthModule,
    PortfolioModule,
    WatchlistModule,
    CoinsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
