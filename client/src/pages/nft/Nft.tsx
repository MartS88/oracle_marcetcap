import React from 'react';
import s from './Nft.module.scss';
import NotConnected from '../not_connected/NotConnected';
import NftCard from '../../components/nft/nftcard/NftCard';
import { ColorRing } from 'react-loader-spinner';
import { useGetNftQuery } from '../../service/cryptoApi';
import Layout from '../../components/layout/Layout';

const Nft = () => {
  const { data: nftArr, isError, isLoading } = useGetNftQuery({});
  const nftData = nftArr?.data?.data;

  return (
    <Layout>
      <div className={s.nft}>
        {isError ? (
          <NotConnected />
        ) : isLoading ? (
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
        ) : (
          <NftCard nftData={nftData} />
        )}
      </div>
    </Layout>
  );
};

export default Nft;
