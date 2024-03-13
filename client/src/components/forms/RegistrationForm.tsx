import React, { useState } from 'react';
import { setAuthenticated } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import s from './LoginFrom.module.scss';
import Logo from '../logo/Logo';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { localStorageService } from '../../service/localStorageService';

const RegistrationForm = () => {
  const [email, setEmail] = useState('dexter1@hot.ee');
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

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/registration', {
        email: email,
        password: password,
      });
      if (response.data.token) {
        const token = response.data.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const credentTials = { email: email, id: decodedToken.id };

        localStorage.setItem('token', token);
        localStorage.setItem('credentials', JSON.stringify(credentTials));
        dispatch(setAuthenticated(true));

        const secondResponse = await axios.post(
          `http://localhost:5000/watchlist/${localStorageService.getCredentials()?.id}/watchlist-create`,

          {
            userId: localStorageService.getCredentials()?.id,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      return response;
    } catch (error) {
      // @ts-ignore
      console.log('error', error.response);
      // @ts-ignore
      setError(error.response.data.message);
    } finally {
    }
  };

  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <Logo />
      <h3>Create your Oracle account</h3>
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
          Sign Up
        </button>
      </div>
    </form>
  );
};
export default RegistrationForm;
