import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import s from './CoinOverView.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
import { FaRegCopy } from 'react-icons/fa';
import { AiFillStar, AiOutlineArrowRight, AiOutlineCheck, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiLogoInternetExplorer } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import copy from 'clipboard-copy';
import { SiHiveBlockchain } from 'react-icons/si';
import CoinInfoPopUp from '../../components/popup/coininfopopup/CoinInfoPopUp';
import ContractPopUp from '../../components/popup/contractpopup/ContractPopUp';
import { Coin } from '../../types/cryptocurrencies';
import { selectWatchlist } from '../../store/slice/watchListSlice';
import { useGetAllCoinsQuery, useGetWatchListQuery } from '../../service/cryptoApi';
import Layout from '../../components/layout/Layout';
import { selectAuth } from '../../store/authSlice';
import axios from 'axios';
import { localStorageService } from '../../service/localStorageService';
import { useHoveredCoinState, useLoadingState, usePopupState } from '../../constants/stateConstants';

const CoinOverView = () => {
  const navigate = useNavigate();
  const selector = useSelector(selectWatchlist);
  const selectorAuth = useSelector(selectAuth);

  const { dataIsLoading, setDataIsLoading } = useLoadingState();
  const { popupIsActive, setPopupIsActive } = usePopupState();
  const { hoveredCoinId, setHoveredCoinId } = useHoveredCoinState();
  const isCoinInWatchList = (coin: Coin) => {
    console.log('coin', coin?.name)
    return watchListData?.some((watchedCoin: Coin) => watchedCoin.symbol === coin.symbol);
  };
  const {
    data: watchListArr,
    error: watchListError,
    isLoading: watchListIsLoading,
    isSuccess,
  } = useGetWatchListQuery(localStorageService.getCredentials()?.id ? localStorageService.getCredentials()?.id : null, {
    pollingInterval: 1000,
  });
  const watchListData = watchListArr?.watchlist;
  const addToWatchListAction = async (coin: Coin) => {
    try {
      setHoveredCoinId('');
      setDataIsLoading(true);
      const userId = localStorageService?.getCredentials()?.id;
      const coinData = [
        {
          userId: userId,
          symbol: coin?.symbol,
          coin: coin?.name,
        },
      ];

      const response = await axios.post(`http://localhost:5000/coins/${userId}/add-coin`, coinData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success === true) {
        setTimeout(() => {
          setDataIsLoading(false);
        }, 3000);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: cryptosList, isError, isLoading } = useGetAllCoinsQuery(1000);
  // {pollingInterval: 1000}
  const coinsData = cryptosList?.data?.result;
  const { id } = useParams();

  const coin = coinsData?.find((crypto: { id: string | undefined }) => crypto?.id === id);

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copy(coin.contractAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className={s.coin_over_view}>
        {!coin || isLoading ? (
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
          <>
            <div className={s.title}>
              <h3 onClick={() => navigate('/')}>Cryptocurrencies</h3>

              <AiOutlineArrowRight size={21} color="blue" />
              <span> {coin?.name} price</span>
            </div>
            <div className={s.coin_block_wrapped}>
              <div className={s.coin_block}>
                <ul>
                  <li>
                    <span className={s.rank}>Rank #{coin?.rank}</span>
                  </li>
                  <li>
                    <img draggable={false} src={coin?.icon} />
                    <span className={s.name}>{coin?.name}</span>
                    <span>{coin.symbol}</span>
                  </li>

                  <li>
                    <span className={s.price}>${coin?.price.toFixed(2)}</span>
                    <span className={`${s.price_changed} ${coin?.priceChange1h > 0 ? s.positive : s.negative}`}>
                      {coin?.priceChange1h}%
                    </span>

                    <AiOutlineInfoCircle
                      size={20}
                      color="gray"
                      onMouseEnter={() => setPopupIsActive('true')}
                      onMouseLeave={() => setPopupIsActive('')}
                    />
                    {selectorAuth?.authenticated && (
                      <>
                        {watchListData && dataIsLoading ? (
                          <ColorRing
                            visible={true}
                            height="25"
                            width="25"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
                          />
                        ) : (
                          <AiFillStar
                            className={s.star}
                            color={isCoinInWatchList(coin) ? 'gold' : 'gray'}
                            onClick={() => addToWatchListAction(coin)}
                            onMouseEnter={() => setHoveredCoinId(coin?.id)}
                            onMouseLeave={() => setHoveredCoinId('')}
                          />
                        )}
                        {hoveredCoinId === coin?.id ? (
                          <span className={s.watch_list_info}>
                            {isCoinInWatchList(coin) ? 'Remove from watchlist' : 'Add to Watchlist'}
                          </span>
                        ) : (
                          <div style={{ width: '250px' }}></div>
                        )}
                      </>
                    )}
                  </li>

                  <li>
                    {coin?.priceBtc.toLocaleString()} <span>BTC</span>
                  </li>
                  {popupIsActive === 'true' ? <CoinInfoPopUp coin={coin} /> : null}
                </ul>
                <div className={s.ul_block}>
                  <ul className={s.second_ul}>
                    <li>
                      Price changed 1d{' '}
                      <span className={`${coin?.priceChange1d > 0 ? s.positive : s.negative}`}>
                        {coin?.priceChange1d}%
                      </span>
                    </li>

                    <li>
                      Price changed 1w{' '}
                      <span className={`${coin?.priceChange1w > 0 ? s.positive : s.negative}`}>
                        {coin?.priceChange1w}%
                      </span>
                    </li>

                    <li>
                      24 Hour Trading Volume <span>${coin?.volume?.toLocaleString()}</span>
                    </li>
                  </ul>

                  <ul className={s.third_ul}>
                    <li>
                      Market Cap <span> ${coin?.marketCap?.toLocaleString()}</span>
                    </li>

                    <li>
                      Circulating Supply <span>${coin?.availableSupply?.toLocaleString()}</span>
                    </li>
                    <li>
                      Total Supply <span>${coin?.totalSupply?.toLocaleString()}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={s.info_block}>
                <h2 className={s.info_block_title}>Info</h2>

                <ul>
                  {coin?.websiteUrl && (
                    <li>
                      Website
                      <a href={coin?.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <BiLogoInternetExplorer size={21} color="lightblue" />
                      </a>
                    </li>
                  )}

                  {coin?.twitterUrl && (
                    <li>
                      Community
                      <a href={coin?.twitterUrl} target="_blank" rel="noopener noreferrer">
                        <BsTwitter size={21} color="blue" />
                      </a>
                    </li>
                  )}

                  {coin?.explorers && (
                    <li>
                      Explorer
                      <a href={coin?.explorers[0]} target="_blank" rel="noopener noreferrer">
                        <SiHiveBlockchain size={21} color="black" />
                      </a>
                    </li>
                  )}

                  {coin?.contractAddress && (
                    <li>
                      Contract
                      {copied ? (
                        <div>
                          <AiOutlineCheck size={18} color="green" />
                        </div>
                      ) : (
                        <FaRegCopy size={18} color="black" onClick={() => handleCopy()} />
                      )}
                    </li>
                  )}
                </ul>
              </div>

              {copied && (
                <div className={s.contract}>
                  <CSSTransition in={copied} timeout={100} classNames="modal" unmountOnExit>
                    <ContractPopUp />
                  </CSSTransition>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CoinOverView;
