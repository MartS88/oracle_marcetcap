import React from 'react';
import s from './NftCards.module.scss';
import { useNavigate } from 'react-router-dom';

const NftCards = ({ nft }) => {
  const navigate = useNavigate();

  const handleNftClick = nft => {
    navigate(`/nfts/${nft?.name}`);
  };

  return (
    <div className={s.nft_cards} onClick={() => handleNftClick(nft)}>
      <div className={s.title_block}>
        <div className={s.img_block}>
          <img src={nft?.img} />
        </div>

        <h2>{nft?.name}</h2>
        <div className={s.price_block}>
          <span className={s.price}>Floor : ${nft?.floorPriceMc}</span>
          <span className={s.price_blockchain}>{nft?.blockchain.slice(0, 3).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default NftCards;
