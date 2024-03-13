import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import s from './Home.module.scss';
import { useGetAllCoinsQuery, useGetMarketsQuery, useGetWatchListQuery } from '../../service/cryptoApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrending, setTrendingData } from '../../store/slice/trendingSlice';
import NotConnected from '../not_connected/NotConnected';
import { ColorRing } from 'react-loader-spinner';
import FearAndGreed from './fearandgreed/FearAndGreed';
import CommunityNews from './communitynews/CommunityNews';
import Trending from './trending/Trending';
import Table from './table/Table';
import { localStorageService } from '../../service/localStorageService';

const Home = () => {
  const dispatch = useDispatch();

  const { data: marketData } = useGetMarketsQuery({});
  const [count, setCount] = useState<number>(10);
  const { data: cryptosList, isError, isLoading } = useGetAllCoinsQuery(1000);
  const coinsData = cryptosList?.data?.result;
  const tableData = coinsData?.slice(0, count);
  const {
    data: watchListArr,
    error: watchListError,
    isLoading: watchListIsLoading,
    isSuccess,
  } = useGetWatchListQuery(localStorageService.getCredentials()?.id ? localStorageService.getCredentials()?.id : null, {
    pollingInterval: 5000,
  });
  const watchListData = watchListArr?.watchlist
  console.log('watchLIstda', watchListData)
  const handleSelectChange = (e: any) => {
    setCount(e.target.value);
  };

  return (
    <Layout>
      <div className={s.home}>
        {isError ? (
          <NotConnected />
        ) : isLoading ? (
          <div className={s.color_ring}>
            <ColorRing
              visible={true}
              height="110"
              width="110"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
            />
          </div>
        ) : (
          <div className={s.content_block}>
            <h1 className={s.title}>Today's Cryptocurrency Prices by Market Cap</h1>
            <div className={s.market_block}>
              The global crypto market cap is{' '}
              <span className={s.marketcap}>{marketData?.data?.marketCap?.toLocaleString()} T,</span>
              {marketData?.volumeChange > 0 ? (
                <div className={s.market_block2}>
                  <span className={s.up}> {marketData?.data?.marketCapChange}%</span>
                  increase over the last day.
                </div>
              ) : (
                <div className={s.market_block2}>
                  <span className={s.down}> {marketData?.data?.marketCapChange}%</span>
                  decrease over the last day.
                </div>
              )}
            </div>
            <div className={s.market_block}>
              Bitcoin dominance is currently <span className={s.marketcap}>{marketData?.data?.btcDominance}%</span>,{' '}
              {marketData?.data?.btcDominanceChange > 0 ? (
                <span className={s.increase_decrease}>a increase</span>
              ) : (
                <span className={s.increase_decrease}>a decrease</span>
              )}
              {marketData?.data?.btcDominanceChange > 0 ? (
                <div className={s.dominance_block}>
                  <span className={s.up}>{marketData?.data?.btcDominanceChange}%</span> over the day.
                </div>
              ) : (
                <div className={s.dominance_block}>
                  <span className={s.down}>{marketData?.data?.btcDominanceChange}%</span> over the day.
                </div>
              )}
            </div>
            <div className={s.block}>
              <Trending coinsData={coinsData} />
              <CommunityNews coinsData={coinsData} />
              <FearAndGreed />
              {/*<OOP/>*/}
            </div>
            <Table
              tableData={tableData}
              count={count}
              setCount={setCount}
              handleSelectChange={handleSelectChange}
              watchListData={watchListData}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
