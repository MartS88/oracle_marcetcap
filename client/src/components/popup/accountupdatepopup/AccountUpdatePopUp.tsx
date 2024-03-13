import React from 'react';
import s from './AccountUpdatePopUp.module.scss';
import { HiOutlineInformationCircle } from 'react-icons/hi';

const AccountUpdatePopUp = ({ message }: { message: string }) => {
  return (
    <div className={s.account_update_popup}>
      <div className={s.popup_block}>
        {message.length > 0 ? (
          <>
            <HiOutlineInformationCircle size={25} color="red" />
            <span className={s.error_title}>{message}</span>
          </>
        ) : (
          <>
            <HiOutlineInformationCircle size={25} color="blue" />
            <span className={s.popup_title}>Account has been successfully updated</span>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountUpdatePopUp;
