import React from 'react';
import s from './ExchangesPopup.module.scss';
import { FaPhoenixFramework } from 'react-icons/fa';
import { FcCurrencyExchange } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const ExchangesPopup = () => {
  const navigate = useNavigate();

  return (
    <div className={s.exchanges_popup}>
      <ul className={s.exchanges_column}>
        {/*<li onClick={() => navigate('/exchanges')} className={s.exchanges_column_item}>*/}
        {/*  <FaPhoenixFramework size={18} color="red" /> Spot*/}
        {/*</li>*/}
        <li onClick={() => navigate('/exchanges/dex')} className={s.exchanges_column_item}>
          <FcCurrencyExchange size={18} /> Dex
        </li>
      </ul>
    </div>
  );
};

export default ExchangesPopup;
