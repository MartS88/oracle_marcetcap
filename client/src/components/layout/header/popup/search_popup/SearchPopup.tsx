import React, { useState } from 'react';
import s from './SearchPopup.module.scss';
import { AiOutlineCloseCircle, AiFillFire, AiOutlineSearch } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllCoinsQuery } from '../../../../../service/cryptoApi';
import { Coin } from '../../../../../types/cryptocurrencies';
interface SearchPopupProps {
  handleSearchPopUpClose: () => void;
}

interface SearchPopupState {
  search: string;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ handleSearchPopUpClose }) => {
  // @ts-ignore
  const trendingArr = useSelector(state => state?.trending?.trendingArr);

  const { data: cryptosList } = useGetAllCoinsQuery(1000);
  // null, {pollingInterval: 1000}
  const coinsData = cryptosList?.data?.result;

  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Coin[] | null>(null);

  //
  const coinSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const results = coinsData?.filter((coin: Coin) => {
      return (
        (coin.name && coin.name.toLowerCase().includes(e.target.value.toLowerCase())) ||
        (coin.symbol && coin.symbol.toLowerCase().includes(e.target.value.toLowerCase())) ||
        (coin?.contractAddress && coin?.contractAddress.toLowerCase()?.includes(e.target.value.toLowerCase()))
      );
    });

    setSearchResults(results?.slice(0, 6) || null);
  };

  return (
    <div className={s.search_popup}>
      <div className={s.search_block}>
        <AiOutlineSearch color="gray" size={20} />
        <input
          onChange={e => coinSearch(e)}
          className={s.search_input}
          type="text"
          placeholder="Search coin , or  contract address"
        />

        <AiOutlineCloseCircle onClick={handleSearchPopUpClose} size={20} color="red" />
      </div>
      <div className={s.search_block2}>
        <h2 className={s.search_title}>
          <AiFillFire size={20} color="orangered" /> Trending{' '}
        </h2>

        <ul className={s.search_list}>
          {searchResults && search.length > 0
            ? searchResults.map((item: Coin) => (
                <NavLink key={item?.id} to={`/currencies/${item?.id}`} onClick={handleSearchPopUpClose}>
                  <li key={item?.id} className={s.search_list_item}>
                    <img src={item?.icon} draggable={false} />
                    {item?.name}
                    <span>{item?.symbol}</span>
                    <div className={s.rank}>#{item?.rank}</div>
                  </li>
                </NavLink>
              ))
            : trendingArr.map((item: Coin) => (
                <NavLink key={item?.id} to={`/currencies/${item.id}`} onClick={handleSearchPopUpClose}>
                  <li key={item?.id} className={s.search_list_item}>
                    <img src={item?.icon} draggable={false} />
                    {item?.name}
                    <span>{item?.symbol}</span>
                    <div className={s.rank}>#{item?.rank}</div>
                  </li>
                </NavLink>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPopup;
