import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Logo.module.scss';
const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      className={s.logo}
      onClick={() => navigate('/')}
      src={require('../../../../assets/logo.png')}
      draggable={false}
      alt="logo"
    />
  );
};

export default Logo;
