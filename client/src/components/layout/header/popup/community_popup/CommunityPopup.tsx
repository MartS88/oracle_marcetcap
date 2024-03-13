import React from 'react';
import s from './CommunityPopup.module.scss';
import { useNavigate } from 'react-router-dom';
import { RiNftFill } from 'react-icons/ri';

const CommunityPopup = () => {
  const navigate = useNavigate();
  return (
    <div className={s.community_popup}>
      <ul className={s.community_column}>
        <li onClick={() => navigate('/nfts')} className={s.community_column_item}>
          <RiNftFill size={18} color="violet" />
          Nft
        </li>
      </ul>
    </div>
  );
};

export default CommunityPopup;
