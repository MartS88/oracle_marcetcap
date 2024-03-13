import React, { useState } from 'react';
import s from './NftCard.module.scss';
import { AiOutlineCheck, AiOutlineClose, AiOutlineTwitter } from 'react-icons/ai';
import { BiLogoInternetExplorer } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import ContractPopUp from './contractpopup/ContractPopup';

const NftCard = ({ nftData }: { nftData: any }) => {
  const { name } = useParams();

  const nft = nftData?.find((nft: { name: string | undefined }) => nft?.name === name);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copy(nftData?.address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleImageError = (e: any) => {
    e.target.src = require('../../../assets/error.jpg');
  };
  return (
    <div className={s.nft_card}>
      <div className={s.nft_background_block}>
        <img className={s.nft_bannerImg} src={nft?.bannerImg} alt={nft?.name} onError={handleImageError} />
      </div>
      <div className={s.wrapper}>
        <div className={s.upper_block}>
          <div className={s.nft_img_block}>
            <img className={s.nft_img} src={nft?.img} alt={nft?.name} draggable={false} />
          </div>

          <div className={s.nft_card_block}>
            <h2>{nft?.name}</h2>

            <ul>
              {nft?.relevantUrls[0]?.url && (
                <a href={nft?.relevantUrls[0]?.url} target="_blank" rel="noopener noreferrer">
                  <li>
                    <BiLogoInternetExplorer color="lightblue" />
                  </li>
                </a>
              )}
              {nft?.relevantUrls[1]?.url && (
                <a href={nft?.relevantUrls[1]?.url} target="_blank" rel="noopener noreferrer">
                  <li>
                    <BsDiscord color="darkblue" />
                  </li>
                </a>
              )}
              {nft?.relevantUrls[2]?.url && (
                <a href={nft?.relevantUrls[2]?.url} target="_blank" rel="noopener noreferrer">
                  <li>
                    <AiOutlineTwitter color="blue" />
                  </li>
                </a>
              )}
            </ul>
          </div>

          <div className={s.nft_rank_block}>
            <span className={s.rank_items}>Rank : </span>
            <span className={s.rank_items2}>{nft?.rank}</span>
          </div>

          <div className={s.nft_contract_address_block}>
            <span>Contract address :</span> <FaEthereum onClick={handleCopy} color="orangered" />
            {copied && <ContractPopUp />}
          </div>

          <div className={s.nft_about_block}>
            <div className={s.total_block}>
              <span className={s.total_items}> Total items: </span>
              <span className={s.total_items2}>{nft?.count ? `${nft?.count}` : 'N/A'}</span>
            </div>

            <div className={s.created_block}>
              <span className={s.created_items}> Created Date: </span>
              <span className={s.created_items2}>
                {nft?.createdDate?.slice(0, 10) ? `${nft?.createdDate?.slice(0, 10)}` : 'N/A'}
              </span>
            </div>

            <div className={s.fee_block}>
              <span className={s.fee_items}> Created fee: </span>
              <span className={s.fee_items2}>{nft?.creatorFee ? `${nft?.creatorFee}` : 'N/A'}</span>
            </div>

            <div className={s.maincur_block}>
              <span className={s.maincur_items}> Chain: </span>
              <span className={s.maincur_items2}>{nft?.mainCurrencyId ? `${nft?.mainCurrencyId}` : 'N/A'}</span>
            </div>

            <div className={s.verified_block}>
              <span className={s.verified_items}> Verified: </span>
              <span className={s.verified_items2}>
                {nft?.verified === true ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}
              </span>
            </div>
          </div>

          <div className={s.nft_description_block}>
            <p className={s.nft_description}>{nft?.description}</p>
          </div>
        </div>

        <div className={s.total_blocks}>
          <div className={s.nft_price_block}>
            <div className={s.volume_block}>
              <span className={s.volume_items}>{nft?.volume ? nft?.volume.toLocaleString() : 'N/A'} ETH</span>
              <span className={s.volume_items2}>total volume</span>
            </div>

            <div className={s.floor_price_block}>
              <span className={s.floor_price_items}>{nft?.floorPriceMc ? nft?.floorPriceMc : 'N/A'} ETH</span>
              <span className={s.floor_price_items2}>floor price</span>
            </div>

            <div className={s.floor_price_block}>
              <span className={s.floor_price_items}>
                {nft?.floorPriceUsd ? nft?.floorPriceUsd.toFixed(2) : 'N/A'} $
              </span>
              <span className={s.floor_price_items2}>floor price</span>
            </div>

            <div className={s.listed_count_block}>
              <span className={s.listed_count_block_items}>{nft?.listedCount ? nft?.listedCount : 'N/A'}</span>
              <span className={s.listed_count_block_items2}>listed count</span>
            </div>

            <div className={s.owners_price_block}>
              <span className={s.owners_price_block_items}>{nft?.ownersCount ? nft?.ownersCount : 'N/A'}</span>
              <span className={s.owners_price_block_items2}>owners</span>
            </div>

            <div className={s.owners_count_changed_block}>
              <span
                className={`${s.owners_count_changed_block_items} ${
                  nft?.ownersCountChange7d !== undefined && nft?.ownersCountChange7d < 0 ? s.down : s.up
                }`}
              >
                {nft?.ownersCountChange7d === null || nft?.ownersCountChange7d === undefined
                  ? 'N/A'
                  : `${nft?.ownersCountChange7d?.toFixed(2)}%`}
              </span>

              <span className={s.owners_count_changed_block_items2}>owners count change 7d</span>
            </div>

            <div className={s.owners_count_changed_block}>
              <span className={`${s.owners_count_changed_block_items} ${nft?.volumeChange7d < 0 ? s.down : s.up}`}>
                {nft?.volumeChange7d !== null ? `${nft?.volumeChange7d.toFixed(2)}%` : 'N/A'}
              </span>

              <span className={s.owners_count_changed_block_items2}>Volume change 7d</span>
            </div>

            <div className={s.owners_count_changed_block}>
              <span
                className={`${s.owners_count_changed_block_items} ${
                  nft?.volumeChange24h < 0 ? s.down : nft?.volumeChange24h >= 0 ? s.up : 'standard'
                }`}
              >
                {nft?.volumeChange24h !== null ? `${nft?.volumeChange24h.toFixed(2)}%` : 'N/A'}
              </span>
              <span className={s.owners_count_changed_block_items2}>Volume change 24h</span>
            </div>

            <div className={s.owners_count_changed_block}>
              <span className={s.owners_count_changed_block_items}>
                {nft?.volumeUsd7d !== null ? `${nft?.volumeUsd7d.toLocaleString()}$` : 'N/A'}
              </span>
              <span className={s.owners_count_changed_block_items2}>Volume change 7d</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
