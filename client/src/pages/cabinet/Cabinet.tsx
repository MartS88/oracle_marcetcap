import React, { useEffect, useState } from 'react';
import s from './Cabinet.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountUpdatePopUp from '../../components/popup/accountupdatepopup/AccountUpdatePopUp';
import { setAuthenticated } from '../../store/authSlice';
import { selectWatchlist } from '../../store/slice/watchListSlice';
import { localStorageService } from '../../service/localStorageService';


const Cabinet = () => {
  const dispatch = useDispatch();
  const selector = useSelector(selectWatchlist);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [passwordResponse, setPasswordResponse] = useState<string>('');
  const [emailResponse, setEmailResponse] = useState<string>('');
  const [accountUpdatePopup, setAccountUpdatePopup] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');



  const logOutHandler = async () => {
    try {
      const watchListData = selector.watchListArr.map((coin: any) => ({
        coinName: coin.name,
        coinId: coin.id,
      }));
      const response = await axios.post(
        `http://localhost:5000/watchlist/${localStorageService.getCredentials()?.id}/watchlist-create`,
        watchListData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      localStorage.clear();
      dispatch(setAuthenticated(false));
      await new Promise(resolve => setTimeout(resolve, 50));
      navigate('/myoracle');
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handlePasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!localStorageService.getCredentials()?.email) {
        throw new Error('Email not found');
      }

      const response = await axios.post(
        `http://localhost:5000/users/${localStorageService.getCredentials()?.email}/update-password`,

        {
          email: localStorageService.getCredentials()?.email,
          newPassword: newPassword,
        },
      );
      if (response.data.success === true) {
        setPasswordResponse(response.data.message);
      }
      if (response.data.success === false) {
        setPasswordResponse(response.data.message);
      }
      setAccountUpdatePopup(true);
      return response;
    } catch (error: any) {
      if (error.response) {
        console.error('Response data1:', error.response.data.message[0]);
        setPasswordResponse(error.response.data.message[0]);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      console.error('Error:', error.config);
    }
  };

  const handleEmailSubmit = async (e: any) => {
    try {
      if (!localStorageService?.getCredentials()?.email) {
        throw new Error('Email not found');
      }

      const response = await axios.post(
        `http://localhost:5000/users/${localStorageService.getCredentials()?.email}/update-email`,
        {
          email: localStorageService?.getCredentials()?.email,
          newEmail: newEmail,
        },
      );
      const credenTials = { ...localStorageService?.getCredentials(), email: newEmail };
      localStorage.setItem('credentials', JSON.stringify(credenTials));
      if (response.data.success === true) {
        setEmailResponse(response.data.message);
      }
      if (response.data.success === false) {
        setEmailResponse(response.data.message);
      }
      if (response.data.message === 'You already have this email') {
        setMessage('You already have this email');
      }
      setAccountUpdatePopup(true);
      return response;
    } catch (error: any) {
      if (error.response) {
        console.error('Response data1:', error.response.data.message[0]);
        setEmailResponse(error.response.data.message[0]);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      console.error('Error:', error.config);
    }
  };

  useEffect(() => {
    if (passwordResponse) {
      setTimeout(() => {
        setPasswordResponse('');
        setNewPassword('');
        setAccountUpdatePopup(false);
      }, 3000);
    }
  }, [passwordResponse, newPassword]);

  useEffect(() => {
    if (emailResponse) {
      setTimeout(() => {
        setEmailResponse('');
        setNewEmail('');
        setAccountUpdatePopup(false);
        setMessage('');
      }, 3000);
    }
  }, [emailResponse, newEmail]);

  return (
    <Layout>
      {accountUpdatePopup && <AccountUpdatePopUp message={message} />}
      <div className={s.cabinet}>
        <div className={s.title}>
          <h2>Account settings</h2>

          <span onClick={logOutHandler} className={s.logout_button}>
            Log out
          </span>

          <div className={s.account_block}>
            <label>Account Password</label>
            <span
              className={`${s.update_span} ${passwordResponse.includes('Password was changed') ? s.updated : ''} ${
                passwordResponse.toLowerCase().includes('password must contain from 5 to 16 characters') ? s.error : ''
              }`}
            >
              {passwordResponse}
            </span>

            <div className={s.update_block}>
              <input value={newPassword} type="text" onChange={handlePasswordChange} placeholder="password" />

              <button
                className={`${s.update_button} ${passwordResponse.includes('Password was changed') ? s.updated : ''} ${
                  passwordResponse.toLowerCase().includes('password must contain from 5 to 16 characters')
                    ? s.error
                    : ''
                }`}
                onClick={handlePasswordSubmit}
              >
                {passwordResponse ? 'Updated' : 'Update'}
              </button>
            </div>

            <label>Account Owner Email</label>
            <span
              className={`${s.update_span} ${emailResponse.includes('Email was changed') ? s.updated : ''} ${
                emailResponse.toLowerCase().includes('not correct email') ||
                emailResponse.toLowerCase().includes('you already have this email')
                  ? s.error
                  : ''
              }`}
            >
              {emailResponse}
            </span>

            <div className={s.update_block}>
              <input value={newEmail} type="text" onChange={handleEmailChange} placeholder="email" />
              <button
                className={`${s.update_button} ${emailResponse.includes('Email was changed') ? s.updated : ''} ${
                  emailResponse.toLowerCase().includes('not correct email') ||
                  emailResponse.toLowerCase().includes('you already have this email')
                    ? s.error
                    : ''
                }`}
                onClick={handleEmailSubmit}
              >
                {emailResponse === 'Email was changed' ? 'Updated' : 'Update'}
              </button>
            </div>

            <label>Account ID</label>
            <span>{localStorageService.getCredentials()?.email}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cabinet;

// async function testResponse() {
//   const description = 'Услуга по защите персональных данных';
//   const ourPhone = '';
//   const ourEmail = 'persdata01bot@gmail.com';
//   const clientEmail = 'dex123@gmail.com';
//   const clientPhone = '';
//   const product = '3 в 1';
//
//   const requestToken = [
//     { TerminalKey: '1706966797185' },
//     { Amount: '100000' },
//     { OrderId: '1ab' },
//     { Description: description },
//     { Password: '1ekdecl5nc3wgwid' },
//   ];
//
//   const sortedData = requestToken.sort((a, b) => {
//     const keyA = Object.keys(a)[0];
//     const keyB = Object.keys(b)[0];
//     return keyA.localeCompare(keyB);
//   });
//
//   const concatenatedString = sortedData.map(obj => Object.values(obj)[0]).join('');
//   const Token = sha256(concatenatedString);
//
//   const requestData = {
//     TerminalKey: '1706966797185',
//     Amount: 100000,
//     OrderId: '1a',
//     Description: description,
//     DATA: {
//       Phone: clientPhone,
//       Email: clientEmail,
//     },
//     Receipt: {
//       Email: ourEmail,
//       Phone: '',
//       Taxation: 'osn',
//       Items: [
//         {
//           Name: product,
//           Price: '100000',
//           Quantity: 1,
//           Amount: '100000',
//           Tax: 'vat10',
//           // Ean13: '303130323930303030630333435',
//         },
//       ],
//     },
//     Token: Token,
//   };
//   console.log('requestData', requestData);
//   try {
//     const response = await axios.post('https://securepay.tinkoff.ru/v2/Init/', requestData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//
//     const paymentId = response.data.PaymentId;
//     const qrData = {
//       TerminalKey: '1706966797185',
//       PaymentId: paymentId,
//       DataType: 'PAYLOAD',
//       Token: Token,
//     };
//
//     const qrDataResponse = await axios.post('https://securepay.tinkoff.ru/v2/GetQr', qrData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (response?.data?.PaymentURL || qrDataResponse?.data?.data) {
//       const paymentURL = response.data.PaymentURL;
//       const qrCodePaymentUrl = qrDataResponse?.data?.data || paymentURL;
//
//       const responseData = {
//         response: response,
//         qrDataResponse: qrDataResponse,
//       };
//
//       console.log('responseData', responseData);
//       console.log('paymentURL', paymentURL);
//
//       return responseData;
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }
