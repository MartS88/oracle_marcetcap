import React, { useEffect, useState } from 'react';
import s from './GainersAndLosers.module.scss';
import { GiPodiumWinner } from 'react-icons/gi';
import GainersTable from './gainerstable/GainersTable';
import LosersTable from './loserstable/LosersTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCoinsQuery, useGetWatchListQuery } from '../../service/cryptoApi';
import { Coin } from '../../types/cryptocurrencies';
import Layout from '../../components/layout/Layout';
import NotConnected from '../not_connected/NotConnected';
import { ColorRing } from 'react-loader-spinner';
import { localStorageService } from '../../service/localStorageService';

const GainersAndLosers = () => {
  const { data: cryptosList, isError, isLoading } = useGetAllCoinsQuery(1000);
  // null, {pollingInterval: 3000}
  const coinsData = cryptosList?.data?.result;
  const {
    data: watchListArr,
    error: watchListError,
    isLoading: watchListIsLoading,
    isSuccess,
  } = useGetWatchListQuery(localStorageService.getCredentials()?.id ? localStorageService.getCredentials()?.id : null, {
    pollingInterval: 5000,
  });
  const watchListData = watchListArr?.watchlist;

  const [gainersArr, setGainersArr] = useState<Coin[]>([]);
  const [losersArr, setLosersArr] = useState<Coin[]>([]);

  useEffect(() => {
    function sortedList() {
      if (coinsData && coinsData.length > 0) {
        let sortedArr = [...coinsData].sort((a, b) => b.priceChange1w - a.priceChange1w);
        return sortedArr.slice(0, 10);
      }
      return [];
    }

    function sortedList2() {
      if (coinsData && coinsData.length > 0) {
        let sortedArr = [...coinsData].sort((a, b) => a.priceChange1w - b.priceChange1w);
        return sortedArr.slice(0, 10);
      }
      return [];
    }

    setGainersArr(sortedList());
    setLosersArr(sortedList2());
  }, [coinsData]);

  return (
    <Layout>
      <div className={s.gainers_and_losers}>
        {isError ? (
          <NotConnected />
        ) : isLoading ? (
          <div className="color_ring">
            <ColorRing
              visible={true}
              height="110"
              width="110"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#fcefef', '#fcefef', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
            />
          </div>
        ) : (
          <>
            <div className={s.title}>
              <GiPodiumWinner size="30" color="gold" />
              <h2>Gainers & Losers</h2>
            </div>

            <p>
              Top Crypto Gainers And Losers Today Which crypto coins and tokens with volume <span>(7d%)</span>{' '}
              <span>US$50,000</span> have gained or lost the most in the last
              <span>7</span> days.
            </p>

            <div className={s.gainers_block}>
              <GainersTable gainersArr={gainersArr} watchListData={watchListData} />
            </div>

            <div className={s.losers_block}>
              <LosersTable losersArr={losersArr} watchListData={watchListData} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
export default GainersAndLosers;
