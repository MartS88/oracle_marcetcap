import React from 'react';
import s from './News.module.scss';
import NewsItem from '../../components/news_item/NewsItem';
import { useGetAllCoinsQuery } from '../../service/cryptoApi';
import Layout from '../../components/layout/Layout';
import NotConnected from '../not_connected/NotConnected';
import { ColorRing } from 'react-loader-spinner';

const News = () => {
  const { data: cryptosList, isError, isLoading } = useGetAllCoinsQuery(1000);
  // null, {pollingInterval: 1000}
  const coinsData = cryptosList?.data?.result;

  return (
    <Layout>
      <div className={s.news}>
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
              colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
            />
          </div>
        ) : (
          coinsData && (
            <>
              <div className={s.title}>
                <h2>News</h2>
                <span>Insights into the biggest events shaping the crypto industry.</span>
              </div>
              <NewsItem />
            </>
          )
        )}
      </div>
    </Layout>
  );
};

export default News;
