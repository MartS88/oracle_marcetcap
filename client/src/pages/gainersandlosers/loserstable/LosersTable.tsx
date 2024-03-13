import React, { useEffect, useState } from 'react';
import s from './LosersTable.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { addToWatchList, removeFromWatchList, selectWatchlist } from '../../../store/slice/watchListSlice';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { Coin } from '../../../types/cryptocurrencies';
import { useHoveredCoinState, useLoadingState, usePopupState } from '../../../constants/stateConstants';
import { localStorageService } from '../../../service/localStorageService';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

const LosersTable = ({ losersArr, watchListData }: { losersArr: Coin[]; watchListData: Coin[] }) => {
  const [sortedCryptosList, setSortedCryptosList] = useState(losersArr || []);
  const [directionSort, setDirectionSort] = useState(false);
  const [sortedField, setSortedField] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 1180 });
  const maxChars = isMobile ? 6 : 14;

  const { dataIsLoading, setDataIsLoading } = useLoadingState();
  const { popupIsActive, setPopupIsActive } = usePopupState();
  const { hoveredCoinId, setHoveredCoinId } = useHoveredCoinState();

  const addToWatchListAction = async (coin: Coin) => {
    const userId = localStorageService.getCredentials()?.id;

    try {
      const coinData = [
        {
          userId: userId,
          symbol: coin?.symbol,
          coin: coin?.name,
        },
      ];

      setHoveredCoinId('');
      setDataIsLoading(true);
      setPopupIsActive(coin?.id);
      const response = await axios.post(`http://localhost:5000/coins/${userId}/add-coin`, coinData);

      if (response.data.success === true) {
        setTimeout(() => {
          setDataIsLoading(false);
          setPopupIsActive('');
        }, 3000);
      }
      setHoveredCoinId('');
      return response;
    } catch (error) {
      console.log(error);
    }
    setHoveredCoinId('');
  };

  const isCoinInWatchList = (coin: Coin) => {
    console.log('coin', coin?.name)
    return watchListData?.some((watchedCoin: Coin) => watchedCoin.symbol === coin.symbol);
  };

  const fieldSort = (field: any) => {
    setDirectionSort(prevDirectionSort => !prevDirectionSort);
    setSortedField(field);

    const sortedList = losersArr ? [...losersArr] : [];

    if (sortedCryptosList) {
      sortedList.sort((a, b) => {
        if (field === 'rank') {
          return directionSort ? b.rank - a.rank : a.rank - b.rank;
        }
        if (field === 'name') {
          return directionSort ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        }
        if (field === 'price') {
          return directionSort ? b.price - a.price : a.price - b.price;
        }
        if (field === 'priceChange1h') {
          return directionSort ? b.priceChange1h - a.priceChange1h : a.priceChange1h - b.priceChange1h;
        }
        if (field === 'priceChange1d') {
          return directionSort ? b.priceChange1d - a.priceChange1d : a.priceChange1d - b.priceChange1d;
        }
        if (field === 'priceChange1w') {
          return directionSort ? b.priceChange1w - a.priceChange1w : a.priceChange1w - b.priceChange1w;
        }
        if (field === 'marketCap') {
          return directionSort ? b.marketCap - a.marketCap : a.marketCap - b.marketCap;
        }
        if (field === 'volume') {
          return directionSort ? b.volume - a.volume : a.volume - b.volume;
        }
        if (field === 'totalSupply') {
          return directionSort ? b.totalSupply - a.totalSupply : a.totalSupply - b.totalSupply;
        }

        return 0;
      });
    }

    setSortedCryptosList(sortedList);
  };

  const renderSortIcon = (field: any) => {
    if (sortedField === field) {
      return directionSort ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />;
    }
    return null;
  };

  useEffect(() => {
    if (losersArr) {
      // @ts-ignore
      fieldSort();
    }
  }, [losersArr]);

  const [hoverCoin, setHoveredCoin] = useState<string | null>(null);

  return (
    <div className={s.losers_table}>
      <div className={s.tableContainer}>
        <label>Top Losers :</label>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.headerCell}></th>
              <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('rank')}>
                <div className={s.headerFlex}>
                  <span>#</span>
                  <span className={s.sortIcon}>{renderSortIcon('rank')}</span>
                </div>
              </th>
              <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('name')}>
                <div className={s.headerFlex}>
                  <span>Name</span>
                  <span className={s.sortIcon}>{renderSortIcon('name')}</span>
                </div>
              </th>
              <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('price')}>
                <div className={s.headerFlex}>
                  <span>Price</span>
                  <span className={s.sortIcon}>{renderSortIcon('price')}</span>
                </div>
              </th>

              <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('priceChange1w')}>
                <div className={s.headerFlex}>
                  <span>7d%</span>
                  <span className={s.sortIcon}>{renderSortIcon('priceChange1w')}</span>
                </div>
              </th>

              <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('marketCap')}>
                <div className={s.headerFlex}>
                  <span>Market Cap</span>
                  <span className={s.sortIcon}>{renderSortIcon('marketCap')}</span>
                </div>
              </th>
              <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('volume')}>
                <div className={s.headerFlex}>
                  <span>Volume</span>
                  <span className={s.sortIcon}>{renderSortIcon('volume')}</span>
                </div>
              </th>

              <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('totalSupply')}>
                <div className={s.headerFlex}>
                  <span>Circulation Supply</span>
                  <span className={s.sortIcon}>{renderSortIcon('totalSupply')}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(losersArr) &&
              (sortedCryptosList || losersArr).map(coin =>
                !coin ? null : (
                  <tr key={coin?.id}>
                    <td style={{ width: '5px' }} className={s.dataCell}>
                      {dataIsLoading && popupIsActive === coin?.id ? (
                        <ColorRing
                          visible={true}
                          height="18"
                          width="18"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
                        />
                      ) : (
                        <AiFillStar
                          style={{ cursor: 'pointer' }}
                          color={isCoinInWatchList(coin) ? 'gold' : 'gray'}
                          size={18}
                          onMouseEnter={() => setHoveredCoinId(coin?.id)}
                          onMouseLeave={() => setHoveredCoinId('')}
                          onClick={() => {
                            addToWatchListAction(coin);
                          }}
                        />
                      )}
                      {hoveredCoinId === coin?.id && (
                        <span className={s.hovered_coin}>
                          {' '}
                          {isCoinInWatchList(coin) ? 'Remove from watchlist' : 'Add to watchlist'}
                        </span>
                      )}
                    </td>
                    <td className={s.dataCell}>{coin?.rank}</td>

                    <td className={s.dataCell}>
                      <NavLink to={`/currencies/${coin?.id}`} className={s.coinLink}>
                        <img src={coin?.icon} width={20} alt="coin_icon" />
                        {coin?.name.length > maxChars ? coin?.name.substring(0, maxChars) + '...' : coin?.name}

                        <span className={s.symbol}> {coin?.symbol}</span>
                      </NavLink>
                    </td>

                    <td className={s.dataCell}>
                      ${coin?.price?.toFixed(2)}
                      <span style={{ marginLeft: '2px' }}></span>
                    </td>
                    <td className={`${s.dataCell} ${coin?.priceChange1w > 0 ? s.positive : s.negative}`}>
                      {coin?.priceChange1w}%
                    </td>
                    <td className={s.dataCell}>{coin?.marketCap?.toLocaleString() || ''}</td>
                    <td className={s.dataCell}>{coin?.volume ? `$${coin?.volume?.toLocaleString()}` : ''}</td>
                    <td className={s.dataCell}>
                      {coin?.totalSupply.toLocaleString()}
                      <span className={s.symbol}>{coin?.symbol}</span>
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LosersTable;
