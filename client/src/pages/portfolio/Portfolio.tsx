import React, { useState } from 'react';
import s from './Portfolio.module.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Dashboard from '../../components/dashboard/Dashboard';
import Layout from '../../components/layout/Layout';
import RegistrationForm from '../../components/forms/RegistrationForm';
import LoginForm from '../../components/forms/LoginForm';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/authSlice';

const Portfolio = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const navigate = useNavigate();
  const selector = useSelector(selectAuth);

  return (
    <Layout>
      <div className="wrapper">
        {selector.authenticated && localStorage.length > 0 ? (
          <div className={s.portfolio}>
            <div className={s.title_block}>
              <h3 className={s.title} onClick={() => navigate('/')}>
                Home
              </h3>
              <AiOutlineArrowRight size={21} color="blue" />
              <span> Portfolio</span>
            </div>
            <div className={s.portfolio_block}>
              <Dashboard />
            </div>
          </div>
        ) : (
          <>
            {showRegisterForm ? (
              <div className={s.portfolio}>
                <h3 className={s.portfolio_title}>
                  In order to access the blockchain explorer, you need to
                  <span className={s.login_register_button} onClick={() => setShowRegisterForm(false)}>
                    {' '}
                    log in
                  </span>{' '}
                  or sign up.
                </h3>
                <RegistrationForm />
              </div>
            ) : (
              <div className={s.portfolio}>
                <h3 className={s.portfolio_title}>
                  In order to access the blockchain explorer, you need to log in or
                  <span className={s.login_register_button} onClick={() => setShowRegisterForm(true)}>
                    {' '}
                    sign up.
                  </span>{' '}
                </h3>
                <LoginForm />
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Portfolio;
