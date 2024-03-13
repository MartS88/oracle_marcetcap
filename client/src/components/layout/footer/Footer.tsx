import React from 'react';
import SocialMedia from './socialmedia/SocialMedia';
import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <SocialMedia />
    </footer>
  );
};

export default Footer;
