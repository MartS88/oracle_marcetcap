import React from 'react';
import s from './CoinInfoPopUp.module.scss';
import { Coin } from '../../../types/cryptocurrencies';

const CoinInfoPopUp = ({ coin }: { coin: Coin }) => {
  return (
    <div className={s.coin_info_popup}>
      <h2>
        How is the price of {coin.name} ({coin.symbol}) calculated?
      </h2>
      <p>
        The price of {coin.name} ({coin.symbol}) is calculated in real-time by changing in 1 hour aggregating the latest
        data across 213 exchanges and 5195 markets, using a global volume-weighted average formula.
      </p>
    </div>
  );
};

export default CoinInfoPopUp;
