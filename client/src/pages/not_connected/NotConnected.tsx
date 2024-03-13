import React from 'react';
import { RiSignalWifiErrorFill } from 'react-icons/ri';
import s from './NotConnected.module.scss';

const NotConnected = () => {
  return (
    <div className={s.not_connected}>
      <RiSignalWifiErrorFill size={30} />
      <h1>There is no Internet connection</h1>
      <ul>
        <li>Checking the network cables, modem , and router</li>
        <li>Reconnecting to Wi-Fi</li>
        <li>Running Connectivity Diagnostics</li>
      </ul>
      <p>ERR_INTERNET_DISCONNECTED</p>
    </div>
  );
};

export default NotConnected;
