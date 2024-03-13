import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Portfolio } from '../../types/portfolio';

interface PortfolioState {
  portfolios: Portfolio[];
  displayMode: boolean;
  portfolioMode: boolean;
  removeMode: boolean;
  portfolioAvatar: string | null;
  editPortfolioAvatar: string | null;
  editPortfolioMode: boolean;
  selectCoinMode: boolean;
  selectedCoin: string | null;
  addTransactionMode: boolean;
  selectedDate: string;
  totalProfitLoss: string;
  transactionsMode: boolean;
  activeItem: Portfolio | null;
  transactionName: string | null;
}

const initialState: PortfolioState = {
  portfolios: [],
  displayMode: false,
  portfolioMode: false,
  removeMode: false,
  portfolioAvatar: null,
  editPortfolioAvatar: null,
  editPortfolioMode: false,
  selectCoinMode: false,
  selectedCoin: null,
  addTransactionMode: false,
  transactionsMode: false,
  selectedDate: '',
  totalProfitLoss: '',
  activeItem: null,
  transactionName: null,
};

function calculateTotal(transactions: any) {
  let total = 0;

  for (const transaction of transactions.buy) {
    total += transaction.quantity * transaction.price;
  }

  for (const transaction of transactions.sell) {
    total -= transaction.quantity * transaction.price;
  }

  return total;
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    changePortfolioIcon: (state, action) => {
      const { portfolioId, newIcon } = action.payload;
      const portfolioToEdit = state.portfolios.find((portfolio: Portfolio) => portfolio.id === portfolioId);
      if (portfolioToEdit) {
        portfolioToEdit.icon = newIcon;
      }
      // @ts-ignore
      state.activeItem = portfolioToEdit;
    },

    setDisplayMode: (state, action) => {
      state.displayMode = action.payload;
    },
    setCreatePortfolioMode: (state, action) => {
      state.portfolioMode = action.payload;
    },
    setRemoveMode: (state, action) => {
      state.removeMode = action.payload;
    },
    setPortfolioAvatar: (state, action) => {
      state.portfolioAvatar = action.payload;
    },
    setEditPortfolioMode: (state, action) => {
      state.editPortfolioMode = action.payload;
    },
    setEditPortfolioAvatar: (state, action) => {
      state.editPortfolioAvatar = action.payload;
    },
    setSelectCoinMode: (state, action) => {
      state.selectCoinMode = action.payload;
    },
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setAddTransactionMode: (state, action) => {
      state.addTransactionMode = action.payload;
    },

    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },

    setTransactionsMode: (state, action) => {
      state.transactionsMode = action.payload;
    },
    setTransactionName: (state, action) => {
      state.transactionName = action.payload;
    },
  },

  selectors: {
    selectPortfolio: state => state,
  },
});

export const {
  changePortfolioIcon,
  setEditPortfolioAvatar,
  setDisplayMode,
  setCreatePortfolioMode,
  setPortfolioAvatar,
  setEditPortfolioMode,
  setRemoveMode,
  setSelectCoinMode,
  setSelectedCoin,
  setAddTransactionMode,
  setSelectedDate,
  setActiveItem,
  setTransactionsMode,
  setTransactionName,
} = portfolioSlice.actions;

export const { selectPortfolio } = portfolioSlice.selectors;
export default portfolioSlice.reducer;
