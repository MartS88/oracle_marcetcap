import React, { createContext, useContext, useEffect, FC, ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWatchlist, setWatchListMode } from '../store/slice/watchListSlice';
import { useGetAllCoinsQuery } from '../service/cryptoApi';
import { selectTrending, setTrendingData } from '../store/slice/trendingSlice';

interface AppProviderContextType {
  isPageReloaded: boolean;
  setReloadPage: () => void;
}

const AppContext = createContext<AppProviderContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const isPageReloadedRef = useRef(false);
  const { data: cryptosList, isError, isLoading } = useGetAllCoinsQuery(1000);
  const coinsData = cryptosList?.data?.result;
  const dispatch = useDispatch();
  const selector = useSelector(selectWatchlist);
  const selectorTradingTable = useSelector(selectTrending);
  const [trendingTableFlag, setTrendingTableFlag] = useState<boolean>(false);

  const setReloadPage = () => {
    isPageReloadedRef.current = true;
    window.location.reload();
  };

  useEffect(() => {
    if (coinsData && coinsData.length > 0 && selectorTradingTable.trendingArr.length <= 0 && !trendingTableFlag) {
      let sortedArr = [...coinsData].sort((a, b) => a.priceChange1h - b.priceChange1h).slice(0, 6);
      dispatch(setTrendingData(sortedArr));
      setTrendingTableFlag(true);
    }
  }, [coinsData, trendingTableFlag]);

  const appProviderValue: AppProviderContextType = {
    isPageReloaded: isPageReloadedRef.current,
    setReloadPage,
  };

  return <AppContext.Provider value={appProviderValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

// const handleKeyDown = async (event: KeyboardEvent) => {
//   if (event.key === 'F5' || event.keyCode === 116) {
//     event.preventDefault();
//
//     try {
//       const watchListData = selector.watchListArr.map((coin: any) => ({
//         coinName: coin.name,
//         coinId: coin.id,
//       }));
//
//       if (watchListData.length > 0) {
//         const response = await axios.post(
//           `http://localhost:5000/watchlist/${localStorageService.getCredentials()?.id}/watchlist-create`,
//
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           },
//         );
//         setTimeout(() => {
//           setReloadPage();
//         }, 100);
//         return response;
//       } else {
//         setTimeout(() => {
//           setReloadPage();
//         }, 100);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };

// useEffect(() => {
//   window.addEventListener('keydown', handleKeyDown);
//
//   return () => {
//     window.removeEventListener('keydown', handleKeyDown);
//   };
// }, [selector?.watchListArr]);
