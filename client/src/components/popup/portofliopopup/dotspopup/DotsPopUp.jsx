import React from 'react';
import s from './DotsPopUp.module.scss';
import { MdEdit } from 'react-icons/md';
import { PiTrashLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectCoinMode,
  setCreatePortfolioMode,
  setEditPortfolioMode,
  setRemoveMode,
  setAddTransactionMode,
} from '../../../../store/slice/portfolioSlice';
import { GrFormClose } from 'react-icons/gr';

const DotsPopUp = ({ item, onClose, setDotsPopUpIsActive }) => {
  const dispatch = useDispatch();
  const removeMode = useSelector(state => state.portfolio.removeMode);

  const removeHandler = () => {
    onClose();
    setDotsPopUpIsActive(false);
    dispatch(setAddTransactionMode(false));
    dispatch(setCreatePortfolioMode(false));
    dispatch(setSelectCoinMode(false));
    dispatch(setRemoveMode(true));
  };

  const clickHandler = () => {
    setDotsPopUpIsActive(false);
    dispatch(setAddTransactionMode(false));
    dispatch(setSelectCoinMode(false));
    dispatch(setCreatePortfolioMode(false));
    dispatch(setEditPortfolioMode(true));
  };

  return (
    <div className={s.dots_popup}>
      <div>
        <div onClick={onClose} className={s.close}>
          <GrFormClose size={30} color="red" />
        </div>

        <div className={s.edit} onClick={clickHandler}>
          <MdEdit size={25} /> Edit portfolio
        </div>
      </div>

      <div onClick={() => removeHandler()} className={s.remove}>
        <PiTrashLight size={25} /> Remove portfolio
      </div>
    </div>
  );
};

export default DotsPopUp;
