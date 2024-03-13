import React, { useEffect } from 'react';
import s from './RemoveTransaction.module.scss';
import { IoIosClose } from 'react-icons/io';
import { IoDocumentsOutline } from 'react-icons/io5';
import { GrTrash } from 'react-icons/gr';
import { Transactions } from '../../types/transactions';
import axios from 'axios';
import { setTransactionName, setTransactionsMode } from '../../store/slice/portfolioSlice';
import { useDispatch } from 'react-redux';

const RemoveTransaction = ({
  transactionHandler,
  transactionName,
  transaction,
  item,
  onClickOutside,
}: {
  transactionHandler: (transaction: Transactions) => void;
  transactionName: string;
  transaction: Transactions;
  item: any;
  onClickOutside: () => void;
}) => {
  const dispatch = useDispatch();
  const removeTransactionData = async (transaction: Transactions | any) => {
    try {
      const portfolioId = item?.id;
      const coin = transaction.name;
      const response = await axios.post(`http://localhost:5000/transactions/${portfolioId}/delete-transactions`, {
        coin: coin,
      });
      transactionHandler(transaction);
      console.log('response', response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${s.remove_transaction}`)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const transactionsModeHandler = () => {
    dispatch(setTransactionsMode(true));
    dispatch(setTransactionName(transactionName));
  };

  return (
    <div className={s.remove_transaction}>
      <IoIosClose size={30} color="red" className={s.close} onClick={() => transactionHandler(transaction)} />
      <div className={s.remove_transaction_div} onClick={transactionsModeHandler}>
        <IoDocumentsOutline size={20} color="gray" />{' '}
        <span className={s.remove_transaction_div_span}>View Transactions</span>
      </div>
      <div className={s.remove_transaction_div2} onClick={() => removeTransactionData(transaction)}>
        <GrTrash size={20} color="gray" /> <span className={s.remove_transaction_div_span}>Remove</span>
      </div>
    </div>
  );
};

export default RemoveTransaction;
