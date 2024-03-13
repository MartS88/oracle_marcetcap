import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: builder => ({
    GetAllCoins: builder.query({
      query: count => `api/coins?limit=${count}`,
    }),
    GetCoin: builder.query({
      query: input => `api/coin/${input.toLowerCase().trim()}`,
    }),
    GetNews: builder.query({
      query: () => 'api/news',
    }),
    GetNft: builder.query({
      query: () => 'api/nft',
    }),
    GetFiats: builder.query({
      query: () => 'api/fiats',
    }),
    GetExchanges: builder.query({
      query: () => 'api/exchanges',
    }),
    GetMarkets: builder.query({
      query: () => 'api/markets',
    }),
    GetBlockchains: builder.query({
      query: () => 'api/blockchains',
    }),
    GetWalletBalance: builder.query({
      query: ({ address, blockchain }) => `api/wallet/${address}/${blockchain}`,
    }),
    GetPortfolios: builder.query({
      query: userId => `portfolio/${userId}/portfolios`,
    }),
    GetWatchList: builder.query({
      query: userId => `coins/${userId}`,
    }),
    GetTransactionsList: builder.query({
      query: portfolioId => `transactions/${portfolioId}`,
    }),
  }),
});

export const {
  useGetAllCoinsQuery,
  useGetExchangesQuery,
  useGetNftQuery,
  useGetNewsQuery,
  useGetBlockchainsQuery,
  useGetWalletBalanceQuery,
  useGetPortfoliosQuery,
  useGetWatchListQuery,
  useGetMarketsQuery,
  useGetTransactionsListQuery,
} = cryptoApi;
