import React, { useEffect } from 'react';
import s from './DashBoardStats.module.scss';
import Table from './Table';
import {
  selectPortfolio,
  setAddTransactionMode,
  setCreatePortfolioMode,
  setEditPortfolioMode,
  setRemoveMode,
  setSelectCoinMode,
  setTransactionName,
  setTransactionsMode,
} from '../../store/slice/portfolioSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTransactionsListQuery } from '../../service/cryptoApi';
import { Coin } from '../../types/cryptocurrencies';
import { GrFormView } from 'react-icons/gr';
import { Transactions } from '../../types/transactions';
import TransactionsTable from '../dashboard/transactions_table/Table';
const DashBoardStats = ({ item, coinsData }: { item: any; coinsData: Coin[] }) => {
  const portfolioId = item?.id;
  const {
    data: transactionsData,
    isError,
    isLoading,
    isSuccess,
  } = useGetTransactionsListQuery(portfolioId, {
    pollingInterval: 5000,
  });

  const transactions = transactionsData?.transactions;
  const selector = useSelector(selectPortfolio);
  const portfolioItem =
    transactions?.length > 0
      ? [...transactions.filter((item: any) => item?.portfolioId === selector?.activeItem?.id)]
      : [];

  const dispatch = useDispatch();
  const addTransactionHandler = () => {
    dispatch(setAddTransactionMode(false));
    dispatch(setRemoveMode(false));
    dispatch(setEditPortfolioMode(false));
    dispatch(setCreatePortfolioMode(false));
    dispatch(setTransactionsMode(false));
    dispatch(setTransactionName(null));
    dispatch(setSelectCoinMode(true));
  };
  const transactionsModeHandler = () => {
    dispatch(setTransactionsMode(false));
    dispatch(setTransactionName(null));
  };

  function calculateRemainingCoins(transactions: Transactions[]) {
    const totalCoins: { [coin: string]: { quantity: number; totalSpent: number | any; transactionType: string } } = {};

    transactions.forEach((transactions: Transactions) => {
      const { coin, quantity, totalSpent, transactionType } = transactions;
      if (!totalCoins[coin]) {
        totalCoins[coin] = { quantity: 0, totalSpent: coin, transactionType: 'TOTAL' };
      }
      if (transactionType === 'Buy') {
        totalCoins[coin].quantity += quantity;
        totalCoins[coin].totalSpent = coinsData
          ?.filter((item: any) => item?.name === coin)
          .map((coin: any) => coin?.price.toFixed(2) * quantity)[0];
      }
      if (transactionType === 'Sell') {
        totalCoins[coin].quantity -= quantity;
      }
    });

    const finalTotalCoins = Object.entries(totalCoins).filter(([key, value]) => value.quantity > 0);
    // const totalSpent = finalTotalCoins.reduce((acc, [key, value]) => acc + value.totalSpent, 0);
    const calculateProfitInDollars = (currentPrice: number, averagePrice: number, totalCoinsBought: number) => {
      const result = (currentPrice - averagePrice) * totalCoinsBought;
      return result;
    };
    return finalTotalCoins;
  }

  useEffect(() => {

  }, [calculateRemainingCoins, portfolioItem]);
  return (
    <div className={s.dashboard_stats}>
      {portfolioItem && portfolioItem?.length > 0 ? (
        <>
          <div className={s.dashboard_block}>
            <span className={s.balance}>Current balance</span>

          </div>
          <div className={s.dashboard_block2}>
            {selector?.transactionsMode ? (
              <>
                <div className={s.transactions_block}>
                  <h2>Transactions</h2>
                  <div onClick={transactionsModeHandler}>
                    <span>View Assets</span>
                    <GrFormView color="blue" size={20} />
                  </div>
                </div>
                <TransactionsTable transactions={portfolioItem} item={item} />
              </>
            ) : (
              <>
                <h2>Assets</h2>
                <Table transactions={portfolioItem} coinsData={coinsData} item={item} />
              </>
            )}
          </div>
        </>
      ) : (
        <div className={s.dashboard_block}>
          <div className={s.no_transactions_block}>
            <img src={require('../../assets/no-transactions.png')} draggable={false} />
            <h2 className={s.title}>This portfolio needs some final touches…</h2>
            <span className={s.title2}>Add a coin to get started</span>
            <button onClick={addTransactionHandler} className={s.create_portfolio}>
              + Add Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardStats;
