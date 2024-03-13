import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '../../types/cryptocurrencies';
import { selectAuth } from '../authSlice';

interface watchListState {
  watchListArr: Coin[];
  watchListMode: boolean;
}

const initialState: watchListState = {
  watchListArr: [],
  watchListMode: false,
};

const watchListSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchList: (state, action: PayloadAction<any>) => {
      if (action.payload.length > 0) {
        action.payload.forEach((coin: any) => {
          const existingItem = state.watchListArr.find(item => item.id === coin.id);
          if (!existingItem) {
            state.watchListArr.push(coin);
          }
        });
      } else {
        const existingItem = state.watchListArr.find((item: Coin) => item?.id === action?.payload?.id);
        if (!existingItem) {
          state.watchListArr.push(action.payload);
        }
      }
    },
    UpdateWatchList: (state, action: PayloadAction<Coin>) => {
      const existingItem = state.watchListArr.find((item: Coin) => item?.id === action?.payload?.id);
      if (!existingItem) {
        state.watchListArr.push(action.payload);
      }
    },
    removeWatchList: (state, action) => {
      state.watchListArr = action.payload;
    },
    removeFromWatchList: (state, action) => {
      state.watchListArr = state.watchListArr.filter((item: Coin) => item.id !== action.payload.id);
    },
    setWatchListMode: (state, action: PayloadAction<boolean>) => {
      state.watchListMode = action.payload;
    },
  },
  selectors: {
    selectWatchlist: state => state,
  },
});

export const { addToWatchList, UpdateWatchList, removeWatchList, removeFromWatchList, setWatchListMode } =
  watchListSlice.actions;
export const { selectWatchlist } = watchListSlice.selectors;
export default watchListSlice.reducer;
