import React from 'react';
import s from './Exchanges.module.scss';
import { useGetExchangesQuery } from '../../service/cryptoApi';
import Layout from '../../components/layout/Layout';
import NotConnected from '../not_connected/NotConnected';
import { ColorRing } from 'react-loader-spinner';
import DexTable from '../../components/dextable/DexTable';

const Exchanges = () => {
  const { data: exchanges, isError, isLoading } = useGetExchangesQuery({});
  // null, {pollingInterval: 1000}
  const exchangesList = exchanges?.data;

  return (
    <Layout>
      <div className={s.exchanges}>
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
          exchanges && (
            <>
              <div className={s.title}>
                <h2>Top Cryptocurrency Decentralized Exchanges:</h2>
                <span>
                  {' '}
                  OracleMarketCap ranks the top decentralized exchanges based on trading volumes, market share of DeFi
                  markets.
                </span>
              </div>

              <DexTable exchanges={exchangesList} />
            </>
          )
        )}
      </div>
    </Layout>
  );
};

export default Exchanges;
