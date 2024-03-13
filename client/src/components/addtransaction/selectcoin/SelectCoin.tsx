import React, { useState } from 'react';
import s from './SelectCoin.module.scss';
import { IoIosClose } from 'react-icons/io';
import { BiSolidRightArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setAddTransactionMode, setSelectCoinMode, setSelectedCoin } from '../../../store/slice/portfolioSlice';
import { Coin } from '../../../types/cryptocurrencies';
import { RootState } from '../../../store/store';

const SelectCoin = ({ coinsData }: { coinsData: Coin[] }) => {
  const dispatch = useDispatch();
  const selectedCoin = useSelector((state: RootState) => state.portfolio.selectedCoin);

  const closeHandler = () => {
    dispatch(setSelectCoinMode(false));
  };

  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Coin[]>([]);

  const coinSearch = (e: any) => {
    setSearch(e.target.value);
    const results = coinsData?.filter((coin: Coin) => {
      return (
        (coin.name && coin.name.toLowerCase().includes(e.target.value.toLowerCase())) ||
        (coin.symbol && coin.symbol.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    });

    setSearchResults(results.slice(0, 6));
  };

  const clickHandler = (item: any) => {
    dispatch(setSelectedCoin(item));
    dispatch(setSelectCoinMode(false));
    dispatch(setAddTransactionMode(true));
  };

  return (
    <div className={s.select_coin}>
      <div className={s.select1}>
        <div className={s.select2}>
          <div className={s.select_block}>
            <h2>Select Coin</h2>

            <IoIosClose className={s.close} onClick={closeHandler} />
          </div>

          <input onChange={e => coinSearch(e)} type="text" placeholder="Search" />
        </div>
        <ul>
          {search.length > 0
            ? searchResults?.map((item: Coin) => (
                <li key={item?.id} onClick={() => clickHandler(item)}>
                  <img src={item?.icon} draggable={false} />
                  {item?.name}
                  <span>{item?.symbol}</span>
                  <BiSolidRightArrowAlt />
                </li>
              ))
            : coinsData?.map((item: Coin) => (
                <li key={item?.id} onClick={() => clickHandler(item)}>
                  <img src={item?.icon} draggable={false} />
                  {item?.name}
                  <span>{item?.symbol}</span>
                  <BiSolidRightArrowAlt />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectCoin;
