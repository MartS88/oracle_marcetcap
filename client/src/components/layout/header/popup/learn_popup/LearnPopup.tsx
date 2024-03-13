import React from 'react';
import s from './LearnPopup.module.scss';
import { FcAbout, FcNews } from 'react-icons/fc';
import { AiOutlineYoutube } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const LearnPopup = () => {
  return (
    <div className={s.learn_popup}>
      <ul className={s.learn_column}>
        <NavLink to="/news">
          <li className={s.learn_column_item}>
            <FcNews size={18} color="blue" /> News
          </li>
        </NavLink>

        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <li className={s.learn_column_item}>
            <AiOutlineYoutube size={18} color="red" /> Videos
          </li>
        </a>

        {/*<li className={s.learn_column_item}> <FcAbout size={18}/> About</li>*/}
      </ul>
    </div>
  );
};

export default LearnPopup;