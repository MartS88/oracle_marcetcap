import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './AddCoin.module.scss';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import {
  addToWatchList,
  removeFromWatchList,
  removeWatchList,
  selectWatchlist,
  setWatchListMode,
} from '../../store/slice/watchListSlice';
import { Coin } from '../../types/cryptocurrencies';
import { localStorageService } from '../../service/localStorageService';
import { useHoveredCoinState, useLoadingState, usePopupState } from '../../constants/stateConstants';
import axios from 'axios';

const AddCoin = ({
  coinsData,
  setShowAddCoinsBlock,
  currentList,
}: {
  coinsData: Coin[];
  setShowAddCoinsBlock: Dispatch<SetStateAction<boolean>>;
  currentList: Coin[];
}) => {
  const dispatch = useDispatch();
  const selector = useSelector(selectWatchlist);
  const closeHandler = () => {
    dispatch(removeWatchList([]));
    dispatch(addToWatchList(currentList));
    dispatch(setWatchListMode(false));
    setShowAddCoinsBlock(false);
  };

  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Coin[]>([]);

  const coinSearch = (e: any) => {
    setSearch(e.target.value);

    const results = coinsData?.filter((coin: Coin) => {
      return (
        (coin?.name && coin?.name?.toLowerCase()?.includes(e.target.value.toLowerCase())) ||
        (coin?.symbol && coin?.symbol?.toLowerCase()?.includes(e.target.value.toLowerCase()))
      );
    });
    setSearchResults(results?.slice(0, 6) || []);
  };

  const { dataIsLoading, setDataIsLoading } = useLoadingState();
  const { popupIsActive, setPopupIsActive } = usePopupState();
  const { hoveredCoinId, setHoveredCoinId } = useHoveredCoinState();
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(false);

  const addToWatchListAction = (coin: any) => {
    if (isCoinInWatchList(coin)) {
      dispatch(removeFromWatchList(coin));
    } else {
      dispatch(addToWatchList(coin));
    }
  };
  const isCoinInWatchList = (coinToCheck: any) => {
    return selector?.watchListArr.some((coin: any) => coin?.symbol === coinToCheck?.symbol);
  };


  useEffect(() => {
    if (selector?.watchListArr.length === 0) {
      setButtonIsDisabled(true);
    } else {
      setButtonIsDisabled(false);
    }
  }, [selector?.watchListArr]);
  useEffect(() => {}, [selector?.watchListArr]);

  const submitHandler = async (coin: any) => {
    try {
      const userId = localStorageService?.getCredentials()?.id;

      const coinsData = selector?.watchListArr.map(coin => ({
        userId: userId,
        symbol: coin?.symbol,
        coin: coin?.name,
      }));

      const response = await axios.post(`http://localhost:5000/coins/${userId}/add-coins`, coinsData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(setWatchListMode(false));
      setShowAddCoinsBlock(false);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.add_coin}>
      <div className={s.select1}>
        <div className={s.select2}>
          <div className={s.select_block}>
            <h2>Select Coin</h2>

            <IoIosClose onClick={closeHandler} />
          </div>

          <input onChange={e => coinSearch(e)} type="text" placeholder="Search" />
          <button className={buttonIsDisabled ? s.disabled : ''} disabled={buttonIsDisabled} onClick={submitHandler}>
            Save
          </button>
        </div>
        <ul>
          {search.length > 0
            ? searchResults?.map((coin: Coin) => (
                <li key={coin?.id} onClick={() => addToWatchListAction(coin)}>
                  <img src={coin?.icon} draggable={false} />
                  {coin?.name}
                  <span>{coin?.symbol}</span>
                  <AiFillStar color={isCoinInWatchList(coin) ? 'gold' : 'gray'} />
                </li>
              ))
            : coinsData?.map((coin: Coin) => (
                <li key={coin?.id} onClick={() => addToWatchListAction(coin)}>
                  <img src={coin?.icon} draggable={false} />
                  {coin?.name}
                  <span>{coin?.symbol}</span>
                  <AiFillStar color={isCoinInWatchList(coin) ? 'gold' : 'gray'} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCoin;
