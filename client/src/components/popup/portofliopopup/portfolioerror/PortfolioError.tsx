import React from 'react';
import s from './PortfolioError.module.scss';
import { HiExclamation } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setRemoveMode } from '../../../../store/slice/portfolioSlice';
import { selectAuth } from '../../../../store/authSlice';
import axios from 'axios';

const PortfolioError = ({ item }: { item: any }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const deleteHandler = async () => {
    console.log('delete');
    console.log('item?.name', item.userId);
    try {
      const userId = item?.userId;
      const portfolioName = item?.name;
      const response = await axios.delete(`http://localhost:5000/portfolio/${userId}/${portfolioName}/delete`);
      dispatch(setRemoveMode(false));
      return response;
    } catch (error) {
      dispatch(setRemoveMode(true));
      console.error('Error', error);
    }
  };

  return (
    <div className={s.portfolio_error}>
      <div onClick={() => dispatch(setRemoveMode(false))} className={s.remove_block}>
        <AiOutlineClose />
      </div>

      <div className={s.block}>
        <HiExclamation />

        <h2>Remove this portfolio?</h2>

        <p>All coins and transactions in this portfolio will be removed.</p>

        <button onClick={() => deleteHandler()} className={s.remove}>
          Remove
        </button>

        <button onClick={() => dispatch(setRemoveMode(false))} className={s.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PortfolioError;
