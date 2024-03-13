import React, { useEffect, useRef, useState } from 'react';
import s from '../navigation/Navigation.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { AiFillStar } from 'react-icons/ai';
import NewsTicker from '../newsticker/NewsTicker';
import Logo from '../logo/Logo';
import CryptoCurrenciesPopup from '../popup/cryptocurrencies_popup/CryptoCurrenciesPopup';
import ExchangesPopup from '../popup/exchanges_popup/ExchangesPopup';
import CommunityPopup from '../popup/community_popup/CommunityPopup';
import ProductsPopup from '../popup/products_popup/ProductsPopup';
import LearnPopup from '../popup/learn_popup/LearnPopup';
import SearchBar from '../searchbar/SearchBar';
import SearchPopup from '../popup/search_popup/SearchPopup';
import { BsBriefcaseFill } from 'react-icons/bs';
import BurgerMenu from '../burgermenu/BurgerMenu';
import { CSSTransition } from 'react-transition-group';
import CoinTicker from '../../../cointicker/CoinTicker';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from '../../../../store/authSlice';
import axios from 'axios';
import { selectWatchlist } from '../../../../store/slice/watchListSlice';
import { localStorageService } from '../../../../service/localStorageService';

interface PopupComponentProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  popupComponent: React.ComponentType<PopupComponentProps>;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const Navigation: React.FC = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [cryptocurrenciesPopupOpen, setCryptocurrenciesPopupOpen] = useState(false);
  const [exchangesPopUpOpen, setExchangesPopupOpen] = useState(false);
  const [communityPopUpOpen, setCommunityPopupOpen] = useState(false);
  const [productsPopUpOpen, setProductsPopupOpen] = useState(false);
  const [learnPopUpOpen, setLearnPopUpOpen] = useState(false);
  const [searchPopUpOpen, setSearchPopUpOpen] = useState(false);
  const closePopupTimerRef = useRef<number | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const navigate = useNavigate();
  const selector = useSelector(selectWatchlist);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const storedCredentials = localStorage.getItem('credentials');
  const getCredentials = storedCredentials ? JSON.parse(storedCredentials) : null;

  const handleCryptocurrenciesPopupOpen = () => {
    setCryptocurrenciesPopupOpen(true);
    setActivePopup('cryptocurrencies');
    clearTimeout(closePopupTimerRef.current as number);
  };

  const handleCryptocurrenciesPopupClose = () => {
    closePopupTimerRef.current = window.setTimeout(() => {
      setCryptocurrenciesPopupOpen(false);
    }, 100);
  };

  const handleExchangesPopupOpen = () => {
    setExchangesPopupOpen(true);
    setActivePopup('exchanges');
    clearTimeout(closePopupTimerRef.current as number);
  };

  const handleExchangesPopupClose = () => {
    closePopupTimerRef.current = window.setTimeout(() => {
      setExchangesPopupOpen(false);
    }, 100);
  };

  const handleCommunityPopupOpen = () => {
    setCommunityPopupOpen(true);
    setActivePopup('community');
    clearTimeout(closePopupTimerRef.current as number);
  };

  const handleCommunityPopupClose = () => {
    closePopupTimerRef.current = window.setTimeout(() => {
      setCommunityPopupOpen(false);
    }, 100);
  };

  const handleProductsPopUpOpen = () => {
    setProductsPopupOpen(true);
    setActivePopup('products');
    clearTimeout(closePopupTimerRef.current as number);
  };

  const handleProductsPopUpClose = () => {
    closePopupTimerRef.current = window.setTimeout(() => {
      setProductsPopupOpen(false);
    }, 100);
  };

  const handleLearnPopUpOpen = () => {
    setLearnPopUpOpen(true);
    setActivePopup('learn');
    clearTimeout(closePopupTimerRef.current as number);
  };

  const handleLearnPopUpClose = () => {
    closePopupTimerRef.current = window.setTimeout(() => {
      setLearnPopUpOpen(false);
    }, 100);
  };

  const handleSearchPopUpOpen = () => {
    setSearchPopUpOpen(true);
  };

  const handleSearchPopUpClose = () => {
    setSearchPopUpOpen(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(closePopupTimerRef.current as number);
    };
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 'cryptocurrencies',
      label: 'Cryptocurrencies',
      popupComponent: CryptoCurrenciesPopup,
      isOpen: cryptocurrenciesPopupOpen,
      handleOpen: handleCryptocurrenciesPopupOpen,
      handleClose: handleCryptocurrenciesPopupClose,
    },
    {
      id: 'exchanges',
      label: 'Exchanges',
      popupComponent: ExchangesPopup,
      isOpen: exchangesPopUpOpen,
      handleOpen: handleExchangesPopupOpen,
      handleClose: handleExchangesPopupClose,
    },
    {
      id: 'community',
      label: 'Community',
      popupComponent: CommunityPopup,
      isOpen: communityPopUpOpen,
      handleOpen: handleCommunityPopupOpen,
      handleClose: handleCommunityPopupClose,
    },
    {
      id: 'products',
      label: 'Products',
      popupComponent: ProductsPopup,
      isOpen: productsPopUpOpen,
      handleOpen: handleProductsPopUpOpen,
      handleClose: handleProductsPopUpClose,
    },
    {
      id: 'learn',
      label: 'Learn',
      popupComponent: LearnPopup,
      isOpen: learnPopUpOpen,
      handleOpen: handleLearnPopUpOpen,
      handleClose: handleLearnPopUpClose,
    },
  ];

  const logOutHandler = async () => {
    localStorage.clear();
    dispatch(setAuthenticated(false));
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
      await new Promise(resolve => setTimeout(resolve, 5));
      navigate('/myoracle');
    } catch (error) {}
  };
  useEffect(() => {}, [token]);

  return (
    <section className={s.navigation}>
      <NewsTicker />

      <nav className={s.navigation_block}>
        {isMobile ? (
          <BurgerMenu />
        ) : (
          <div className={s.navigation_container}>
            <div className={s.logo}>
              <NavLink to="/myoracle">
                <Logo />
              </NavLink>
            </div>

            <ul>
              {menuItems.map(menuItem => (
                <li key={menuItem.id} onMouseEnter={menuItem.handleOpen} onMouseLeave={menuItem.handleClose}>
                  {menuItem.label}
                  {menuItem.isOpen && activePopup === menuItem.id && (
                    <menuItem.popupComponent onMouseEnter={menuItem.handleOpen} onMouseLeave={menuItem.handleClose} />
                  )}
                </li>
              ))}
            </ul>

            {token && localStorageService?.getCredentials()?.id && (
              <div className={s.login_block}>
                <NavLink to="/cabinet">
                  <div className={s.user_logged_block}>
                    <span className={s.email_char}>{localStorageService?.getCredentials()?.email[0]}</span>
                    <span className={s.email_title}>{localStorageService?.getCredentials()?.email}</span>
                  </div>
                </NavLink>
                <span onClick={logOutHandler} className={s.email_block_logout_button}>
                  Log out
                </span>
              </div>
            )}

            <div className={s.block}>
              <NavLink to="/watchlist">
                <div className={s.watchlist}>
                  <AiFillStar color="gray" size={20} /> Watchlist
                </div>
              </NavLink>

              <NavLink to="/portfolio-tracker/">
                <div className={s.portfolio}>
                  <BsBriefcaseFill color="gray" size={20} /> Portfolio
                </div>
              </NavLink>

              <div onClick={handleSearchPopUpOpen}>
                <SearchBar />
              </div>

              {searchPopUpOpen && (
                <CSSTransition in={searchPopUpOpen} timeout={500} classNames="search-popup" unmountOnExit>
                  <SearchPopup handleSearchPopUpClose={handleSearchPopUpClose} />
                </CSSTransition>
              )}
            </div>
          </div>
        )}
      </nav>

      <CoinTicker />
    </section>
  );
};
export default Navigation;
