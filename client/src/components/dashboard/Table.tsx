import React, { useState } from 'react';
import s from './Table.module.scss';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { Coin } from '../../types/cryptocurrencies';
import { Transactions } from '../../types/transactions';
import { GoPlus } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  setAddTransactionMode,
  setCreatePortfolioMode,
  setEditPortfolioMode,
  setRemoveMode,
  setSelectCoinMode,
  setTransactionName,
  setTransactionsMode,
} from '../../store/slice/portfolioSlice';
import RemoveTransaction from '../removetransaction/RemoveTransaction';
const Table = ({ transactions, coinsData, item }: { transactions: any; coinsData: Coin[]; item: any }) => {
  const navigate = useNavigate();

  const allBuyTransactions: any = [];
  const allSellTransactions: any = [];

  const [sortedCryptosList, setSortedCryptosList] = useState(allBuyTransactions || []);
  const [directionSort, setDirectionSort] = useState(false);
  const [sortedField, setSortedField] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 1180 });
  const maxChars = isMobile ? 6 : 15;

  const fieldSort = (field: any) => {
    setDirectionSort(prevDirectionSort => !prevDirectionSort);
    setSortedField(field);

    const sortedList = allBuyTransactions ? [...allBuyTransactions] : [];

    if (allBuyTransactions) {
      sortedList.sort((a, b) => {
        if (field === 'coinType') {
          return directionSort ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        }
        if (field === 'price') {
          return directionSort ? b.price - a.price : a.price - b.price;
        }
        if (field === 'quantity') {
          return directionSort ? b.quantity - a.quantity : a.quantity - b.quantity;
        }
        if (field === 'date') {
          return directionSort ? b.date - a.date : a.date - b.date;
        }

        if (field === 'note') {
          return directionSort ? b.note.length - a.note.length : a.note.length - b.note.length;
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
  const [hoverTransactionId, setHoverTransactionId] = useState<string>('');
  const [removeTransactionFlag, setRemoveTransactionFlag] = useState<boolean>(false);
  const transactionHandler = (transaction: Transactions) => {
    if (hoverTransactionId.length === 0 && !removeTransactionFlag) {
      setHoverTransactionId(transaction?.id);
      setRemoveTransactionFlag(true);
    } else {
      setHoverTransactionId('');
      setRemoveTransactionFlag(false);
    }
  };

  const filteredTransactions = coinsData?.filter((coinInCoinsData: Coin) => {
    return transactions?.some((coinInTransactions: Transactions) => coinInTransactions?.coin === coinInCoinsData?.name);
  });

  function calculateRemainingCoins(transactions: Transactions[]) {
    const totalCoins: { [coin: string]: { quantity: number; totalSpent: number; averagePrice: number } } = {};

    transactions?.forEach((transaction: Transactions) => {
      const { coin, quantity, totalSpent, averagePrice, transactionType } = transaction;
      if (!totalCoins[coin]) {
        totalCoins[coin] = { quantity: 0, totalSpent: 0, averagePrice: 0 };
      }
      if (transactionType === 'Buy') {
        totalCoins[coin].quantity += quantity;
        totalCoins[coin].totalSpent += totalSpent;
        totalCoins[coin].averagePrice = totalCoins[coin].totalSpent / totalCoins[coin].quantity;
      }
      if (transactionType === 'Sell') {
        totalCoins[coin].quantity -= quantity;
        totalCoins[coin].totalSpent -= totalSpent;
      }
    });
    return totalCoins;
  }

  const calculateProfitInDollars = (currentPrice: number, averagePrice: number, totalCoinsBought: number) => {
    const result = (currentPrice - averagePrice) * totalCoinsBought;
    return result;
  };
  const calculateProfitInPercentage = (currentPrice: any, averagePrice: any) => {
    if (currentPrice && averagePrice) {
      const result = ((currentPrice - averagePrice) / averagePrice) * 100;

      return result;
    } else {
      return '~~';
    }
  };
  const handleOutsideClick = () => {
    console.log('Clicked outside of RemoveTransaction component');
  };

  return (
    <div onClick={handleOutsideClick} className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('coinType')}>
              <div className={s.headerFlex}>
                <span>Name</span>
                <span className={s.sortIcon}>{renderSortIcon('coinType')}</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('price')}>
              <div className={s.headerFlex}>
                <span>Price</span>
                <span className={s.sortIcon}>{renderSortIcon('price')}</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('1h%')}>
              <div className={s.headerFlex}>
                <span>1h%</span>
                <span className={s.sortIcon}>{renderSortIcon('1h%')}</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('24h%')}>
              <div className={s.headerFlex}>
                <span>24h%</span>
                <span className={s.sortIcon}>{renderSortIcon('24h%')}</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('7d%')}>
              <div className={s.headerFlex}>
                <span>7d%</span>
                <span className={s.sortIcon}>{renderSortIcon('7d%%')}</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('coinType')}>
              <div className={s.headerFlex}>
                <span>Holdings</span>
                <span className={s.sortIcon}>{renderSortIcon('quantity')}</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('avgPrice')}>
              <div className={s.headerFlex}>
                <span>Avg.BuyPrice</span>
                <span className={s.sortIcon}>{renderSortIcon('avgPrice')}</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('profitLoss')}>
              <div className={s.headerFlex}>
                <span>Profit/Loss</span>
                <span className={s.sortIcon}>{renderSortIcon('profitLoss')}</span>
              </div>
            </th>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`}>
              <div className={s.headerFlex}>
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions?.map((filteredCoin: any) => {
            const coinInfo = calculateRemainingCoins(transactions)[filteredCoin?.name];

            return (
              <tr key={filteredCoin?.id}>
                <td className={s.dataCell}>
                  <a href={`/currencies/${filteredCoin?.id}`} target="_blank" rel="noopener noreferrer">
                    <div className={s.datacell_block}>
                      <img src={filteredCoin?.icon} alt={filteredCoin?.name} />
                      {filteredCoin?.name}
                      <span>{filteredCoin?.symbol}</span>
                    </div>
                  </a>
                </td>
                <td className={s.dataCell}>${filteredCoin?.price.toLocaleString()}</td>
                <td className={`${s.dataCell} ${filteredCoin?.priceChange1h > 0 ? s.positive : s.negative}`}>
                  {filteredCoin?.priceChange1h}%
                </td>
                <td className={`${s.dataCell} ${filteredCoin?.priceChange1d > 0 ? s.positive : s.negative}`}>
                  {filteredCoin?.priceChange1d}%
                </td>
                <td className={`${s.dataCell} ${filteredCoin?.priceChange1w > 0 ? s.positive : s.negative}`}>
                  {filteredCoin?.priceChange1w}%
                </td>
                <td className={s.dataCell}>
                  <div className={s.total_coins}>
                    {coinInfo?.quantity}
                    {filteredCoin?.symbol}
                  </div>
                </td>

                {coinInfo && (
                  <>
                    <td className={s.dataCell}>${coinInfo?.averagePrice.toLocaleString()}</td>
                  </>
                )}

                {coinInfo && (
                  <>
                    <td className={s.dataCell}>
                      <div className={s.profit_block}>
                        <span>
                          ${' '}
                          {calculateProfitInDollars(
                            filteredCoin?.price,
                            coinInfo?.averagePrice,
                            coinInfo?.quantity,
                          ).toLocaleString()}
                        </span>

                        <span
                          className={`${s.profit_block_span} ${
                            parseFloat(
                              calculateProfitInPercentage(filteredCoin?.price, coinInfo?.averagePrice).toLocaleString(),
                            ) > 0
                              ? s.positive
                              : s.negative
                          }`}
                        >
                          {calculateProfitInPercentage(filteredCoin?.price, coinInfo?.averagePrice).toLocaleString()}%
                        </span>
                      </div>
                    </td>
                  </>
                )}

                <td className={s.dataCell}>
                  <div className={s.svg_div}>
                    <GoPlus onClick={addTransactionHandler} size={22} color="gray" />
                    <BsThreeDots onClick={() => transactionHandler(filteredCoin)} size={22} />
                  </div>
                  {hoverTransactionId === filteredCoin?.id && (
                    <RemoveTransaction
                      transactionHandler={transactionHandler}
                      transaction={filteredCoin}
                      item={item}
                      transactionName={filteredCoin?.name}
                      onClickOutside={handleOutsideClick}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
