import React from 'react';
import s from './CryptoCurrenciesPopup.module.scss';
import { GiPodiumWinner } from 'react-icons/gi';
import { FaRankingStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { AiFillFire } from 'react-icons/ai';

const CryptoCurrenciesPopup = () => {
  const navigate = useNavigate();

  return (
    <div className={s.cryptocurrencies_popup}>
      <ul className={s.cryptocurrencies_column}>
        <li onClick={() => navigate('/myoracle')} className={s.cryptocurrencies_column_item}>
          <FaRankingStar size={18} color="blue" /> Ranking
        </li>
        <li onClick={() => navigate('/trending')} className={s.cryptocurrencies_column_item}>
          <AiFillFire size={18} color="orangered" />
          Trending
        </li>
        <li onClick={() => navigate('/gainers&losers')} className={s.cryptocurrencies_column_item}>
          <GiPodiumWinner size={18} color="gold" />
          Gainers & Losers
        </li>
        {/*<li className={s.cryptocurrencies_column_item}><IoStatsChartSharp size={18}/> Global Charts</li>*/}
        {/*<li className={s.cryptocurrencies_column_item}><VscHistory size={18}/>Historical Snapshots</li>*/}
      </ul>
    </div>
  );
};

export default CryptoCurrenciesPopup;
