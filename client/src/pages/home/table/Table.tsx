import React, { useEffect, useState } from 'react';
import s from './Table.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { Coin } from '../../../types/cryptocurrencies';
import { localStorageService } from '../../../service/localStorageService';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useHoveredCoinState, useLoadingState, usePopupState } from '../../../constants/stateConstants';

const Table = ({
  tableData,
  count,
  handleSelectChange,
  setCount,
  watchListData,
}: {
  tableData: Coin[];
  count: number;
  handleSelectChange: any;
  setCount: (value: ((prevState: number) => number) | number) => void;
  watchListData: Coin[];
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const coin = tableData?.find((crypto: any) => crypto?.id === id);

  const isMobile = useMediaQuery({ maxWidth: 1180 });
  const maxChars = isMobile ? 9 : 14;

  const { dataIsLoading, setDataIsLoading } = useLoadingState();
  const { popupIsActive, setPopupIsActive } = usePopupState();
  const { hoveredCoinId, setHoveredCoinId } = useHoveredCoinState();
  const addToWatchListAction = async (coin: any) => {
    try {
      setHoveredCoinId('');
      setDataIsLoading(true);
      setPopupIsActive(coin?.id);
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
          setPopupIsActive('');
        }, 3000);
      }
      setHoveredCoinId('');
      return response;
    } catch (error) {
      console.error(error);
    }
  };



  const [sortedCryptosList, setSortedCryptosList] = useState(tableData || []);
  const [directionSort, setDirectionSort] = useState(false);
  const [sortedField, setSortedField] = useState(null);

  const fieldSort = (field: any) => {
    setDirectionSort(prevDirectionSort => !prevDirectionSort);
    setSortedField(field);

    const sortedList = tableData ? [...tableData] : [];

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

  const isCoinInWatchList = (coin: Coin) => {
    console.log('coin', coin?.name)
    return watchListData?.some((watchedCoin: Coin) => watchedCoin.symbol === coin.symbol);
  };

  useEffect(() => {
    if (tableData) {
      // @ts-ignore
      fieldSort();
    }
  }, [count, tableData]);

  return (
    <div className={s.tableContainer}>
      <div className={s.select_block}>
        <span>Rows</span>
        <select value={count} onChange={handleSelectChange}>
          <option value={300}>300</option>
          <option value={100}>100</option>
          <option value={50}>50</option>
          <option value={10}>10</option>
        </select>
      </div>

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
          {Array.isArray(tableData) &&
            (sortedCryptosList || tableData).map((coin: any) =>
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
                  <td className={`${s.dataCell} ${coin?.priceChange1h > 0 ? s.positive : s.negative}`}>
                    {coin?.priceChange1h}%
                  </td>
                  <td className={`${s.dataCell} ${coin?.priceChange1d > 0 ? s.positive : s.negative}`}>
                    {coin?.priceChange1d}%
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
  );
};

export default Table;
