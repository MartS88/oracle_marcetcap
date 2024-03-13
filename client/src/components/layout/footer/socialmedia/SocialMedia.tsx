import React from 'react';
import s from './SocialMedia.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../../header/logo/Logo';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaTelegramPlane, FaFacebook } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className={s.socialmedia}>
      <Logo />

      <p>© 2023 Oracle MarketCap. All rights reserved</p>

      <ul>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <li>
            <AiFillInstagram size={25} color="red" />
          </li>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <li>
            <AiOutlineTwitter size={25} color="blue" />
          </li>
        </a>
        <a href="https://t.me/kriptodvizhuha" target="_blank" rel="noopener noreferrer">
          <li>
            <FaTelegramPlane size={25} color="lightblue" />
          </li>
        </a>
        <a href="https://t.me/kriptodvizhuha" target="_blank" rel="noopener noreferrer">
          <li>
            <FaFacebook size={25} color="blue" />
          </li>
        </a>
      </ul>
    </div>
  );
};

export default SocialMedia;
