import React from 'react';
import s from './TrendingCoins.module.scss';
import { AiFillFire } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Table from './table/Table';
import Layout from '../../components/layout/Layout';
import { selectTrending } from '../../store/slice/trendingSlice';

const TrendingTable = () => {
  const selector = useSelector(selectTrending);

  return (
    <Layout>
      <div className={s.trending}>
        <div className={s.trending_block}>
          <AiFillFire size={20} color="orangered" />

          <h2>Trending</h2>
        </div>
        <p>
          What Are The Trending Cryptocurrencies On <span>Oracle MarketCap?</span>
          Below is a list of the trending cryptocurrencies that people are searching for on{' '}
          <span>Oracle MarketCap.</span>
        </p>

        <div>
          <Table trendingArr={selector?.trendingArr} />
        </div>
      </div>
    </Layout>
  );
};

export default TrendingTable;
