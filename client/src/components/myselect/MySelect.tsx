import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './MySelect.module.scss';
import Select from 'react-select';
import NotConnected from '../../pages/not_connected/NotConnected';
import { useGetBlockchainsQuery, useGetWalletBalanceQuery } from '../../service/cryptoApi';
import { Blockchain, BlockchainApiResponse } from '../../types/blockchains';
import { ColorRing } from 'react-loader-spinner';

const MySelect: React.FC = () => {
  const { data: blockchains, isError, isLoading } = useGetBlockchainsQuery({});

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      background: 'whitesmoke',
      width: '280px',
      padding: '2px',
      height: '32px',
      color: '#22293d',
      border: '1px solid #80b5ef',
      fontSize: '1rem',
      fontWeight: '400',
      '&:hover': {
        border: '1px solid #80b5ef',
        color: 'whitesmoke',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#1d74d3' : 'whitesmoke',
      color: state.isSelected ? 'white' : '#22293d',
      '&:hover': {
        backgroundColor: '#80b5ef',
        border: '1px solid #80b5ef',
        color: 'whitesmoke',
      },
    }),
  };
  const options = blockchains?.data?.map((option: Blockchain) => ({
    value: option.connectionId,
    label: (
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
        <span>{option.name}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#22293d' }}>{option.chain} </span>
      </div>
    ),
    name: option.name,
    connectionId: option.connectionId,
    chain: option.chain,
    icon: option.icon,
  }));

  const [selectedOption, setSelectedOption] = useState(options ? options[0] : 'binacesmartchain');
  const [value, setValue] = useState('');

  const handleCurrencyChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  const onChangeValue = (inputValue: string) => {
    setValue(inputValue);
  };

  const [formData, setFormData] = useState('');
  // 0xC882b111A75C0c657fC507C04FbFcD2cC984F071
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const {
    data: walletData,
    isError: walletError,
    isLoading: walletLoading,
  } = useGetWalletBalanceQuery({
    address: formData,
    blockchain: selectedOption ? selectedOption.value : '',
  });
  if (walletLoading) {
    return (
      <div className="color_ring">
        <ColorRing
          visible={true}
          height="110"
          width="110"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={s.my_select}>
        <NotConnected />
      </div>
    );
  }
  const handleSubmit = async (e: any) => {
    console.log('selectO', selectedOption);
  };

  return (
    <div className={s.my_select}>
      <div className={s.my_select}>
        <div className={s.select_blocks}>
          <div className={s.select_block}>
            <label htmlFor="select">Select blockchain:</label>
            <Select
              defaultValue={selectedOption}
              styles={customStyles}
              options={options}
              value={selectedOption}
              onChange={handleCurrencyChange}
            />
          </div>
          <div className={s.select_block}>
            <label htmlFor="Wallet">Wallet:</label>
            <input
              type="text"
              id="wallet"
              name="wallet"
              placeholder="Search coins in chain"
              className={s.wallet}
              value={formData}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={s.select_block2}>
          <span className={s.select_block2_title}>Wallet:</span>
          <span className={s.select_block2_title2}> {formData}</span>
          {walletData?.data && walletData?.data?.length > 0 ? (
            walletData?.data.map((item: any) => (
              <ul className={s.wallet_list} key={item?.coinId}>
                <div className={s.wallet_div}>
                  <li>
                    <span className={s.wallet_chain}>{item?.chain}</span>
                    <span className={s.wallet_amount}>{item?.amount.toLocaleString()}</span>
                  </li>
                  <div className={s.wallet_description_block}>
                    <span className={s.wallet_description}>Description:</span>
                    <span className={s.wallet_description_about}>{item?.coinId}</span>
                  </div>
                </div>
              </ul>
            ))
          ) : (
            <span className={s.wallet_empty_wallet}>This wallet doesn't have any coin in this chain</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySelect;
