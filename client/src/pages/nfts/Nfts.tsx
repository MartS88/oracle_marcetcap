import React from 'react';
import s from './Nfts.module.scss';
import { useGetNftQuery } from '../../service/cryptoApi';
import NotConnected from '../not_connected/NotConnected';
import { ColorRing } from 'react-loader-spinner';
import NftCards from '../../components/nft/nftcards/NftCards';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../../components/layout/Layout';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { scrollToElement } from '../../utils/scrollUtils';

const Nfts = () => {
  const { data: nftList, isError, isLoading } = useGetNftQuery({});
  const nftData = nftList?.data?.data;
  const sortedNftData = nftData && [...nftData].sort((a, b) => b.floorPriceUsd - a.floorPriceUsd);

  return (
    <Layout>
      {isError ? (
        <NotConnected />
      ) : isLoading ? (
        <div className={s.nfts}>
          <div className="color_ring">
            <ColorRing
              visible={true}
              height="110"
              width="110"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
            />
          </div>
        </div>
      ) : (
        <div className={s.nfts}>
          <div className="wrapper">
            <h2 className={s.nfts_title}>NFT</h2>

            <div className={s.scroll_block} onClick={() => scrollToElement('scroll_down_button')}>
              <span className={s.scroll_button} id="scroll_up_button">
                Scroll down
              </span>
              <AiOutlineArrowDown size={15} color="blue" />
            </div>

            <div className={s.nfts_block}>
              {sortedNftData && sortedNftData?.map((nft: any) => <NftCards key={uuidv4()} nft={nft} />)}
            </div>

            <div className={s.scroll_block} onClick={() => scrollToElement('scroll_up_button')}>
              <span className={s.scroll_button} id="scroll_down_button">
                Back to Top
              </span>
              <AiOutlineArrowUp size={15} color="blue" />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Nfts;
