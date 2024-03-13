import React from 'react';
import Navigation from '../header/navigation/Navigation';
import s from './Header.module.scss';
const Header = () => {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
};

export default Header;
