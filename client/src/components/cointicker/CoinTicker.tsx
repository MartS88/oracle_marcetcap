import React from 'react';
import s from './CoinTicker.module.scss';
import { useNavigate } from 'react-router-dom';
import { Coin } from '../../types/cryptocurrencies';
import { useGetAllCoinsQuery } from '../../service/cryptoApi';

const CoinTicker = () => {
  const { data: cryptosList, isError, isLoading } = useGetAllCoinsQuery(1000);
  const coinsData: Coin[] | undefined = cryptosList?.data?.result;
  const navigate = useNavigate();

  return (
    <div className={s.cointicker}>
      <ul>
        {coinsData &&
          coinsData.map((coin: Coin) => (
            <li key={coin?.id} onClick={() => navigate(`/currencies/${coin?.id}`)}>
              <img src={coin?.icon} width={25} />
              <div className={s.item_block}>
                <span className={s.name}>{coin?.name}</span>
                <span className={s.symbol}>{coin?.symbol}</span>
              </div>
              <span className={s.price}>${coin?.price.toLocaleString()}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CoinTicker;
