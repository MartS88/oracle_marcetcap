import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import s from './BlockchainExplorer.module.scss';
import MySelect from '../../components/myselect/MySelect';
import RegistrationForm from '../../components/forms/RegistrationForm';
import LoginForm from '../../components/forms/LoginForm';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/authSlice';

const BlockchainExplorer: React.FC = () => {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const selector = useSelector(selectAuth);

  return (
    <Layout>
      <div className="wrapper">
        <div className={s.blockchain_explorer}>
          {selector.authenticated && localStorage.token  ? (
            <>
              <h3 className={s.blockchain_title}>Check wallet balance:</h3>
              <MySelect />
            </>
          ) : (
            <>
              {showRegisterForm ? (
                <>
                  <h3 className={s.blockchain_title2}>
                    In order to access blockchain explorer you need to
                    <span className={s.login_register_button} onClick={() => setShowRegisterForm(false)}>
                      {' '}
                      log in
                    </span>{' '}
                    or sign up.
                  </h3>

                  <RegistrationForm />
                </>
              ) : (
                <>
                  {' '}
                  <h3 className={s.blockchain_title2}>
                    In order to access blockchain explorer you need to log in or
                    <span className={s.login_register_button} onClick={() => setShowRegisterForm(true)}>
                      {' '}
                      sign up.
                    </span>{' '}
                  </h3>
                  <LoginForm />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlockchainExplorer;
