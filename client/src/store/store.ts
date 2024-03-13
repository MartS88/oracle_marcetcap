import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import trendingReducer from '../store/slice/trendingSlice';
import watchlistReducer from '../store/slice/watchListSlice';
import portfolioReducer from '../store/slice/portfolioSlice';
import { apiSlice } from './apiSlice';
import { cryptoApi } from '../service/cryptoApi';
import { fearApi } from '../service/fearApi';

const rootReducer = combineReducers({
  auth: authReducer,
  trending: trendingReducer,
  watchlist: watchlistReducer,
  portfolio: portfolioReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  [fearApi.reducerPath]: fearApi.reducer,
});

const storedLocaleStorage = localStorage.length > 0;

const preloadedState = {
  auth: {
    authenticated: !!storedLocaleStorage,
  },
};

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware, cryptoApi.middleware, fearApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
