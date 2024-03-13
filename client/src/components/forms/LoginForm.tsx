import React, { useState } from 'react';
import { useLoginMutation, useRegistrationMutation } from '../../store/apiSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuthenticated } from '../../store/authSlice';
import s from './LoginFrom.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import Logo from '../logo/Logo';

const LoginForm = () => {
  const [email, setEmail] = useState('dexter@hot.ee');
  const [password, setPassword] = useState('dexter');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const removeHandler = () => {
    setEmail('');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegistrationMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: email,
        password: password,
      });

      if (response.data && response.data.token) {
        const token = response.data.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const credentTials = { email: email, id: decodedToken.id };

        localStorage.setItem('token', token);
        localStorage.setItem('credentials', JSON.stringify(credentTials));
        dispatch(setAuthenticated(true));
      }
      return response;
    } catch (error) {
      // @ts-ignore
      console.log('error', error);
      // @ts-ignore
      setError(error.response.data.message);
    } finally {
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Logo />
      <h3>Log in in to your Oracle account</h3>
      <div className={s.inputs_block}>
        <div className={s.email_block}>
          <div className={s.email_input_block}>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Email adress*"
              autoComplete="off"
              className={s.block_input}
              onChange={handleEmailChange}
            />
            <AiOutlineMail onClick={removeHandler} className={s.email_button} size={25} />
          </div>

          {error && <span style={{ width: '100%', color: 'red' }}>{error}</span>}
        </div>

        <div className={s.password_block}>
          <div className={s.password_input_block}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              placeholder="Password*"
              autoComplete="off"
              className={s.block_input}
              onChange={handlePasswordChange}
            />
            {showPassword ? (
              <AiOutlineEyeInvisible className={s.open_eye} onClick={handleTogglePassword} size={25} />
            ) : (
              <AiOutlineEye className={s.open_eye} onClick={handleTogglePassword} size={25} />
            )}
          </div>
          <div />
        </div>

        <p>
          By creating an account, you agree to Oracle's Terms of Use and Privacy Policy. You understand Oracle and its
          affiliates may use your address to send updates, ads, and offers.
        </p>

        <button type="submit" className={s.submit_button}>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

// const handleSubmit = async (e: any) => {
//   e.preventDefault();
//
//   try {
//     dispatch(setIsLoading(true));
//     const response = await axios.post(
//        'http://localhost:5000/auth/login',
//        {
//          username: email,
//          password: password,
//        },
//        {
//          withCredentials: true,
//        },
//     );
//
//     if (response.data && response.data.token) {
//       const token = response.data.token;
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       dispatch(
//          setCredentials({ email: email, id: decodedToken.id, response: { data: { token: response.data.token } } }),
//       );
//     }
//     console.log('respons', response);
//     return response;
//   } catch (error) {
//     dispatch(setIsError(true));
//     // @ts-ignore
//     console.log('error', error);
//     // @ts-ignore
//     setError(error.response.data.message);
//   } finally {
//     dispatch(setIsLoading(false));
//   }
// };
