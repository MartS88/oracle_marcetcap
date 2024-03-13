import React, { useState } from 'react';
import s from './AddTransaction.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import Select from 'react-select';
import { BsPencilSquare } from 'react-icons/bs';
import Date from './datepicker/Date';
import { selectPortfolio, setAddTransactionMode } from '../../store/slice/portfolioSlice';
import { Coin } from '../../types/cryptocurrencies';
import { RootState } from '../../store/store';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { localStorageService } from '../../service/localStorageService';

interface AddTransactionProps {
  coinsData: Coin[];
  item: any;
}

interface CurrencyOption {
  name: string;
  value: number;
  id: string;
  label: JSX.Element;
  symbol: string;
  price: number;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ coinsData, item }: { coinsData: Coin[]; item: any }) => {
  const dispatch = useDispatch();
  const selector = useSelector(selectPortfolio);
  const selectedCoin = useSelector((state: RootState) => state.portfolio.selectedCoin);
  const selectDate = useSelector((state: RootState) => state.portfolio.selectedDate);

  const defaultCur: CurrencyOption[] | undefined = coinsData?.map(option => ({
    name: option?.name,
    value: option?.price,
    id: option?.id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <img src={option?.icon} alt="flag" width={25} style={{ marginRight: '1px' }} />
        {option?.name}
        <span style={{ fontSize: '0.8rem', fontWeight: '400', color: 'gray' }}>{option?.symbol}</span>
      </div>
    ),
    symbol: option?.symbol,
    price: option?.price,
  }));

  const [fromCurrency, setFromCurrency] = useState<CurrencyOption | null>(
    // @ts-ignore
    defaultCur?.find(coin => typeof coin === 'object' && coin.name === (selectedCoin?.name || null)) || null,
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '15px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#eee' : 'white',
      color: state.isFocused ? 'black' : '#333',
      fontWeight: '500',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#333',
      fontWeight: '500',
    }),
    menu: (provided: any) => ({
      ...provided,
      maxHeight: '150px',
      scrollWidth: '0',
      overflow: 'hidden',
    }),
  };

  const [quantity, setQuantity] = useState<number>(0.0);
  const [price, setPrice] = useState<string>(fromCurrency?.price?.toFixed(2).toString() || '0.00');
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(selectDate);
  const [operation, setOperation] = useState<string>('Buy');

  const onChangeFromCurrency = (currency: CurrencyOption | null) => {
    setFromCurrency(currency);
    setPrice(currency?.price?.toFixed(2).toString() || '0.00');
  };

  const handleItemClick = (selectedOperation: string) => {
    setOperation(selectedOperation);
  };

  const closeHandler = () => {
    dispatch(setAddTransactionMode(false));
  };

  const updateInvestCase = (): number | undefined => {
    let result;

    if (operation === 'Buy' || operation === 'Sell') {
      result = quantity * parseFloat(price);
      return result;
    }
  };

  const fetchHandler = async (item: any) => {
    try {
      const portfolioId = selector?.activeItem?.id;
      if (!fromCurrency || !fromCurrency.name) {
        alert('Coin is missing or invalid.');
        return;
      }

      const parsedQuantity = parseFloat(quantity.toString());
      const parsedPrice = parseFloat(price);
      const totalSpent = parsedQuantity * parsedPrice;
      const averagePrice = totalSpent / parsedQuantity;

      if (parsedQuantity <= 0) {
        alert('You must put correct Quantity');
      }

      if (parsedQuantity > 0) {
        if (!isNaN(parsedQuantity) && !isNaN(parsedPrice)) {
          const transactionData = [
            {
              portfolioId: portfolioId,
              portfolioName: selector?.activeItem?.name,
              id: uuidv4(),
              coin: fromCurrency.name,
              coinSymbol: fromCurrency.symbol,
              quantity: parsedQuantity,
              price: parsedPrice,
              averagePrice: averagePrice,
              totalSpent: totalSpent,
              date: selectDate,
              note: note,
              transactionType: operation,
            },
          ];

          setNote('');
          dispatch(setAddTransactionMode(false));
          const response = await axios.post(
            `http://localhost:5000/transactions/${portfolioId}/add-transaction`,
            transactionData,
          );
          return response;
        } else {
          alert('Invalid quantity or price input');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.add_transaction}>
      <span className={s.total_acc}>Account: {item?.name}</span>

      <div className={s.title}>
        <h2>Add Transaction</h2>
        <IoIosClose className={s.close} onClick={closeHandler} />
      </div>

      <div className={s.buy_sell_block}>
        <div className={`${s.buy_block} ${operation === 'Buy' ? s.active : ''}`} onClick={() => handleItemClick('Buy')}>
          <span className={s.buy_button}> Buy </span>
        </div>

        <div
          className={`${s.sell_block} ${operation === 'Sell' ? s.active : ''}`}
          onClick={() => handleItemClick('Sell')}
        >
          <span className={s.sell_button}> Sell </span>
        </div>
      </div>

      <div className={s.select_block}>
        <Select styles={customStyles} options={defaultCur} value={fromCurrency} onChange={onChangeFromCurrency} />
      </div>

      <div className={s.from_to_block}>
        <div className={s.from}>
          <label>Quantity</label>

          <input onChange={e => setQuantity(parseFloat(e.target.value))} value={quantity} type="number" />
        </div>

        <div className={s.to}>
          <label>Price Per Coin</label>

          <input onChange={e => setPrice(e.target.value)} value={price} type="number" />
        </div>
      </div>
      <div className={s.data_block}>
        <Date />
      </div>

      <div className={s.note}>
        <div className={s.note_block}>
          <BsPencilSquare />
          <span>Add Note</span>
        </div>
        <textarea
          onChange={e => setNote(e.target.value)}
          value={note}
          maxLength={70}
          placeholder="Write your note here"
        />
      </div>
      <div className={s.total}>
        {operation === 'Buy' ? (
          <span className={s.total_spent}>Total spent</span>
        ) : (
          <span className={s.total_received}>Total Received</span>
        )}

        <span className={s.total_money}>{updateInvestCase()?.toLocaleString()} $</span>
      </div>

      <button onClick={() => fetchHandler(item)}>Add Transaction</button>
    </div>
  );
};

export default AddTransaction;
