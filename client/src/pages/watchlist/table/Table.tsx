import React, { useEffect, useState } from 'react';
import s from './Table.module.scss';
import { removeFromWatchList, selectWatchlist } from '../../../store/slice/watchListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { ColorRing } from 'react-loader-spinner';
import { localStorageService } from '../../../service/localStorageService';
import axios from 'axios';
import { Coin } from '../../../types/cryptocurrencies';

import { useHoveredCoinState, useLoadingState, usePopupState } from '../../../constants/stateConstants';

const Table = ({ currentList }: { currentList: Coin[] }) => {
  const dispatch = useDispatch();
  const selector = useSelector(selectWatchlist);
  const isMobile = useMediaQuery({ maxWidth: 1180 });
  const maxChars = isMobile ? 6 : 14;
  const [sortedCryptosList, setSortedCryptosList] = useState<Coin[]>(currentList || []);
  const [directionSort, setDirectionSort] = useState<boolean | null>(null);
  const [sortedField, setSortedField] = useState<string | null>(null);

  const { dataIsLoading, setDataIsLoading } = useLoadingState();
  const { popupIsActive, setPopupIsActive } = usePopupState();
  const { hoveredCoinId, setHoveredCoinId } = useHoveredCoinState();

  const fieldSort = (field: string) => {
    setDirectionSort(prevDirectionSort => !prevDirectionSort);
    setSortedField(field);

    const sortedList = currentList ? [...currentList] : [];

    if (sortedCryptosList) {
      sortedList?.sort((a: any, b: any) => {
        if (field === 'rank') {
          return directionSort ? b?.rank - a?.rank : a?.rank - b?.rank;
        }
        if (field === 'name') {
          return directionSort ? b?.name.localeCompare(a.name) : a?.name.localeCompare(b.name);
        }
        if (field === 'price') {
          return directionSort ? b?.price - a?.price : a?.price - b?.price;
        }
        if (field === 'priceChange1h') {
          return directionSort ? b?.priceChange1h - a?.priceChange1h : a?.priceChange1h - b?.priceChange1h;
        }
        if (field === 'priceChange1d') {
          return directionSort ? b?.priceChange1d - a?.priceChange1d : a?.priceChange1d - b?.priceChange1d;
        }
        if (field === 'priceChange1w') {
          return directionSort ? b?.priceChange1w - a?.priceChange1w : a?.priceChange1w - b?.priceChange1w;
        }
        if (field === 'marketCap') {
          return directionSort ? b?.marketCap - a?.marketCap : a?.marketCap - b?.marketCap;
        }
        if (field === 'volume') {
          return directionSort ? b?.volume - a?.volume : a?.volume - b?.volume;
        }
        if (field === 'totalSupply') {
          return directionSort ? b?.totalSupply - a?.totalSupply : a?.totalSupply - b?.totalSupply;
        }
        return 0;
      });
    }
    setSortedCryptosList(sortedList);
  };

  const renderSortIcon = (field: string) => {
    if (sortedField === field) {
      return directionSort ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />;
    }
    return null;
  };

  useEffect(() => {
    if (currentList) {
      // @ts-ignore
      fieldSort();
    }
  }, [currentList]);

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
      dispatch(removeFromWatchList(coin));
      setHoveredCoinId('');
      setDataIsLoading(true);
      setPopupIsActive(coin?.id);
      const response = await axios.post(`http://localhost:5000/coins/${userId}/delete-coin`, coinData);

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

  return (
    <div className={s.tableContainer}>
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

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('priceChange1h')}>
              <div className={s.headerFlex}>
                <span>1h%</span>
                <span className={s.sortIcon}>{renderSortIcon('priceChange1h')}</span>
              </div>
            </th>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('priceChange1d')}>
              <div className={s.headerFlex}>
                <span>1d%</span>
                <span className={s.sortIcon}>{renderSortIcon('priceChange1d')}</span>
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
          {Array.isArray(currentList) &&
            (sortedCryptosList || selector?.watchListArr)?.map((coin: Coin) => {
              if (!coin) {
                return null;
              }
              return (
                <tr key={coin?.id}>
                  <td key={coin?.id} style={{ width: '5px' }} className={s.dataCell}>
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
                        color="gold"
                        size={18}
                        onMouseEnter={() => setHoveredCoinId(coin?.id)}
                        onMouseLeave={() => setHoveredCoinId('')}
                        onClick={() => {
                          addToWatchListAction(coin);
                        }}
                      />
                    )}
                    {hoveredCoinId === coin?.id && <span className={s.hovered_coin}>Remove from main watchlist</span>}
                  </td>

                  <td className={s.dataCell}>{coin?.rank}</td>

                  <td className={s.dataCell}>
                    <NavLink to={`/currencies/${coin?.id}`} className={s.coinLink}>
                      <img src={coin?.icon} width={20} alt="coin_icon" />

                      {coin?.name?.length > maxChars ? coin?.name.substring(0, maxChars) + '...' : coin?.name}

                      <span className={s.symbol}> {coin?.symbol}</span>
                    </NavLink>
                  </td>

                  <td className={s.dataCell}>
                    ${coin?.price?.toFixed(2)}
                    <span style={{ marginLeft: '2px' }}></span>
                  </td>
                  <td className={`${s.dataCell} ${coin?.priceChange1h > 0 ? s.positive : s.negative}`}>
                    {coin?.priceChange1h}%
                  </td>
                  <td className={`${s.dataCell} ${coin?.priceChange1d > 0 ? s.positive : s.negative}`}>
                    {coin?.priceChange1d}%
                  </td>
                  <td className={`${s.dataCell} ${coin?.priceChange1w > 0 ? s.positive : s.negative}`}>
                    {coin?.priceChange1w}%
                  </td>
                  <td className={s.dataCell}>
                    {coin?.marketCap !== undefined ? coin?.marketCap?.toLocaleString() : ''}
                  </td>
                  <td className={s.dataCell}>
                    {coin?.volume !== undefined ? `$${coin?.volume?.toLocaleString()}` : ''}
                  </td>
                  <td className={s.dataCell}>
                    {coin?.totalSupply?.toLocaleString()}
                    <span className={s.symbol}>{coin?.symbol}</span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
