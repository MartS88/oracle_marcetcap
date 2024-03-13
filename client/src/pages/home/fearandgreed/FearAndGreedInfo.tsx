import React from 'react';
import s from './FearAndGreedInfo.module.scss';

const FearAndGreedInfo = () => {
  return (
    <div className={s.fear_and_greed_info}>
      <p>
        When the value is closer to 0, the market is in Extreme Fear, and investors have over-sold irrationally.
        <br /> <br />
        When the value is closer to 100, the market is in Extreme Greed, indicating a likely market correction.
        <br /> <br />
        Oracle uses the price and trading data of the most popular crypto coins, together with our unique user behaviour
        data to present a more accurate crypto market sentiment.
      </p>
    </div>
  );
};

export default FearAndGreedInfo;