import React, { useState } from 'react';
import s from './Table.module.scss';
import { useMediaQuery } from 'react-responsive';
import { GrTrash } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import portfolioSlice, {
  selectPortfolio,
  setAddTransactionMode,
  setCreatePortfolioMode,
  setEditPortfolioMode,
  setRemoveMode,
  setSelectCoinMode,
  setTransactionName,
  setTransactionsMode,
} from '../../../store/slice/portfolioSlice';
import { IoIosClose } from 'react-icons/io';
import axios from 'axios';

const Table = ({ transactions, item }: { transactions: any; item: any }) => {
  const selector = useSelector(selectPortfolio);
  const dispatch = useDispatch()
  const isMobile = useMediaQuery({ maxWidth: 1180 });
  const maxChars = isMobile ? 6 : 15;
  const transactionsArr = transactions.filter((coin: any) => coin.coin === selector.transactionName);
  const [removeTransactionFlag, setRemoveTransactionFlag] = useState<boolean>(false);

  const [id, setId] = useState<string>('');
  const closeHandler = (id: '') => {
    setId('');
    setRemoveTransactionFlag(!removeTransactionFlag);
    console.log('id', id);
  };
  const selectTransactionHandler = (id: string) => {
    setId(id);
    setRemoveTransactionFlag(!removeTransactionFlag);
    console.log('id', id);
  };

  const removeTransactionHandler = async () => {
    try {
      const portfolioId = selector?.activeItem?.id;
      const transactionData = {
        id: 'd002677c-29f0-4a68-924c-24347d324057',
        portfolioId: portfolioId,
      };
      if (id && portfolioId) {
        const response = await axios.post(
          `http://localhost:5000/transactions/${portfolioId}/delete-transaction/${id}`,
          transactionData,
        );
        setRemoveTransactionFlag(!removeTransactionFlag);

        return response;
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  return (
    <div className={s.tableContainer}>
      <h2 className={s.coin}>{selector.transactionName}</h2>

      <table className={s.table}>
        <thead>
          <tr>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`}>
              <div className={s.headerFlex}>
                <span>Type</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`}>
              <div className={s.headerFlex}>
                <span>Price</span>
              </div>
            </th>

            <th className={`${s.headerCell} ${s.headerCellWithFlex}`}>
              <div className={s.headerFlex}>
                <span>Amount</span>
              </div>
            </th>

            <th className={s.headerCell}>
              <div className={s.headerFlex}>
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactionsArr?.map((filteredCoin: any) => {
            return (
              <tr key={filteredCoin?.id}>
                <td className={s.dataCell}>
                  <div className={s.datacell_block_wrapped}>
                    <span className={s.transaction_type}>{filteredCoin?.transactionType[0]}</span>
                    <div className={s.datacell_block}>
                      <span>{filteredCoin?.transactionType}</span>
                      <span>{filteredCoin?.updatedAt}</span>
                    </div>
                  </div>
                </td>
                <td className={s.dataCell}>${filteredCoin?.price.toLocaleString()}</td>
                <td className={s.dataCell}>
                  <div className={s.datacell_block2}>
                    <span>$ {filteredCoin?.price}</span>
                    <span>
                      {filteredCoin.quantity} {filteredCoin?.coinSymbol}
                    </span>
                  </div>
                </td>

                <td className={s.dataCell}>
                  <div className={s.svg_div}>
                    <GrTrash size={20} color="gray" onClick={() => selectTransactionHandler(filteredCoin?.id)} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {removeTransactionFlag && (
        <div className={s.remove_transaction_wrapp}>
          <div className={s.remove_transaction_block}>
            <div className={s.remove_transaction_title_block}>
              <h2>Remove Transaction</h2>
              <IoIosClose size={25} color="red" className={s.close} onClick={() => closeHandler('')} />
            </div>

            <span>Are you sure you want to remove this transaction?</span>

            <button className={s.button_remove} onClick={removeTransactionHandler}>
              Remove
            </button>
            <button className={s.button_cancel} onClick={() => closeHandler('')}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
