import React from 'react';
import s from './ProductsPopup.module.scss';
import { FaTelegram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { SiHiveBlockchain } from 'react-icons/si';

const ProductsPopup = () => {
  return (
    <div className={s.products_popup}>
      <ul className={s.products_column}>
        <NavLink to="/blockchain_explorer">
          <li className={s.products_item}>
            <SiHiveBlockchain size={18} color="black" /> Blockchain Explorer
          </li>
        </NavLink>
        <a href="https://t.me/insurePersDatabot" target="_blank" rel="noopener noreferrer">
          <li className={s.products_item}>
            <FaTelegram size={18} color="blue" /> Telegram Bot
          </li>
        </a>
      </ul>
    </div>
  );
};

export default ProductsPopup;
