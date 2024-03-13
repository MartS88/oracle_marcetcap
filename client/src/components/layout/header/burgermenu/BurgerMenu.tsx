import React, { useEffect, useRef, useState } from 'react';
import s from './BurgerMenu.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import CryptoCurrenciesPopup from '../popup/cryptocurrencies_popup/CryptoCurrenciesPopup';
import ExchangesPopup from '../popup/exchanges_popup/ExchangesPopup';
import CommunityPopup from '../popup/community_popup/CommunityPopup';
import ProductsPopup from '../popup/products_popup/ProductsPopup';
import LearnPopup from '../popup/learn_popup/LearnPopup';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillStar, AiOutlineClose } from 'react-icons/ai';
import { BsBriefcaseFill } from 'react-icons/bs';
import SearchBar from '../searchbar/SearchBar';
import SearchPopup from '../popup/search_popup/SearchPopup';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

const BurgerMenu = () => {
  //   const [activePopup, setActivePopup] = useState(null);
  //   const [cryptocurrenciesPopupOpen, setCryptocurrenciesPopupOpen] = useState(false);
  //   const [exchangesPopUpOpen, setExchangesPopupOpen] = useState(false);
  //   const [communityPopUpOpen, setCommunityPopupOpen] = useState(false);
  //   const [productsPopUpOpen, setProductsPopupOpen] = useState(false);
  //   const [learnPopUpOpen, setLearnPopUpOpen] = useState(false);
  //   const [searchPopUpOpen, setSearchPopUpOpen] = useState(false);
  //   const closePopupTimerRef = useRef(null);
  //
  //   const handleCryptocurrenciesPopupOpen = () => {
  //     setCryptocurrenciesPopupOpen(true);
  //     setActivePopup('cryptocurrencies');
  //     clearTimeout(closePopupTimerRef.current);
  //   };
  //
  //   const handleCryptocurrenciesPopupClose = () => {
  //     closePopupTimerRef.current = setTimeout(() => {
  //       setCryptocurrenciesPopupOpen(false);
  //     }, 100);
  //     setActivePopup(false);
  //   };
  //
  //   const handleExchangesPopupOpen = () => {
  //     setExchangesPopupOpen(true);
  //     setActivePopup('exchanges');
  //     clearTimeout(closePopupTimerRef.current);
  //   };
  //
  //   const handleExchangesPopupClose = () => {
  //     closePopupTimerRef.current = setTimeout(() => {
  //       setExchangesPopupOpen(false);
  //     }, 100);
  //   };
  //
  //   const handleCommunityPopupOpen = () => {
  //     setCommunityPopupOpen(true);
  //     setActivePopup('community');
  //     clearTimeout(closePopupTimerRef.current);
  //   };
  //
  //   const handleCommunityPopupClose = () => {
  //     closePopupTimerRef.current = setTimeout(() => {
  //       setCommunityPopupOpen(false);
  //     }, 100);
  //   };
  //
  //   const handleProductsPopUpOpen = () => {
  //     setProductsPopupOpen(true);
  //     setActivePopup('products');
  //     clearTimeout(closePopupTimerRef.current);
  //   };
  //
  //   const handleProductsPopUpClose = () => {
  //     closePopupTimerRef.current = setTimeout(() => {
  //       setProductsPopupOpen(false);
  //     }, 100);
  //   };
  //
  //   const handleLearnPopUpOpen = () => {
  //     setLearnPopUpOpen(true);
  //     setActivePopup('learn');
  //     clearTimeout(closePopupTimerRef.current);
  //   };
  //
  //   const handleLearnPopUpClose = () => {
  //     closePopupTimerRef.current = setTimeout(() => {
  //       setLearnPopUpOpen(false);
  //     }, 100);
  //   };
  //   const handleSearchPopUpOpen = () => {
  //     setSearchPopUpOpen(true);
  //   };
  //   const handleSearchPopUpClose = () => {
  //     setSearchPopUpOpen(false);
  //   };
  //
  //   const navigate = useNavigate();
  //
  //   useEffect(() => {
  //     return () => {
  //       clearTimeout(closePopupTimerRef.current);
  //     };
  //   }, []);
  //
  //   const menuItems = [
  //     {
  //       id: 'cryptocurrencies',
  //       label: 'Cryptocurrencies',
  //       isOpen: cryptocurrenciesPopupOpen,
  //       popupComponent: CryptoCurrenciesPopup,
  //       handleOpen: handleCryptocurrenciesPopupOpen,
  //       handleClose: handleCryptocurrenciesPopupClose,
  //     },
  //     {
  //       id: 'exchanges',
  //       label: 'Exchanges',
  //       isOpen: exchangesPopUpOpen,
  //       popupComponent: ExchangesPopup,
  //       handleOpen: handleExchangesPopupOpen,
  //       handleClose: handleExchangesPopupClose,
  //     },
  //     {
  //       id: 'community',
  //       label: 'Community',
  //       isOpen: communityPopUpOpen,
  //       popupComponent: CommunityPopup,
  //       handleOpen: handleCommunityPopupOpen,
  //       handleClose: handleCommunityPopupClose,
  //     },
  //     {
  //       id: 'products',
  //       label: 'Products',
  //       isOpen: productsPopUpOpen,
  //       popupComponent: ProductsPopup,
  //       handleOpen: handleProductsPopUpOpen,
  //       handleClose: handleProductsPopUpClose,
  //     },
  //     {
  //       id: 'learn',
  //       label: 'Learn',
  //       isOpen: learnPopUpOpen,
  //       popupComponent: LearnPopup,
  //       handleOpen: handleLearnPopUpOpen,
  //       handleClose: handleLearnPopUpClose,
  //     },
  //   ];
  //
  //   const [isOpen, setOpen] = useState(false);
  //   const [activeMenuItem, setActiveMenuItem] = useState(null);
  //   const handleMenuItemClick = clickedId => {
  //     setActiveMenuItem(clickedId);
  //   };
  //
  return (
    // <div className={s.cover}>
    //   <nav className={s.nav_bar}>
    //         <div className={`${s.nav_bar_button} ${isOpen ? s.hamburger : s.close}`}>
    //           {isOpen ? (
    //             <AiOutlineClose size={30} onClick={() => setOpen(false)} />
    //           ) : (
    //             <GiHamburgerMenu size={30} onClick={() => setOpen(true)} />
    //           )}
    //         </div>
    //
    //         {isOpen && (
    //           <>
    //             <ul>
    //               {menuItems.map(menuItem => (
    //                 <li key={menuItem.id} onMouseEnter={menuItem.handleOpen} onMouseLeave={menuItem.handleClose}>
    //                   <div
    //                     className={s.div}
    //                     onClick={() => {
    //                       handleMenuItemClick(menuItem.id);
    //                       if (menuItem.isOpen) {
    //                         menuItem.handleClose(); // Закрыть всплывающее окно, если оно открыто
    //                       } else {
    //                         menuItem.handleOpen(); // Открыть всплывающее окно, если оно закрыто
    //                       }
    //                     }}
    //                   >
    //                     {menuItem.label}{' '}
    //                     {menuItem.isOpen && activePopup === menuItem.id ? (
    //                       <BiSolidUpArrow size={7} />
    //                     ) : (
    //                       <BiSolidDownArrow size={7} />
    //                     )}
    //                   </div>
    //
    //                   {menuItem.isOpen && activePopup === menuItem.id && (
    //                     <menuItem.popupComponent onMouseEnter={menuItem.handleOpen} onMouseLeave={menuItem.handleClose} />
    //                   )}
    //                 </li>
    //               ))}
    //             </ul>
    //
    //             <div className={s.block}>
    //               <NavLink to="/watchlist">
    //                 <div className={s.watchlist}>
    //                   <AiFillStar color="gray" size={20} /> Watchlist
    //                 </div>
    //               </NavLink>
    //
    //               <NavLink to="/portfolio-tracker/">
    //                 <div className={s.portfolio}>
    //                   <BsBriefcaseFill color="gray" size={20} /> Portfolio
    //                 </div>
    //               </NavLink>
    //
    //               <div onClick={handleSearchPopUpOpen}>
    //                 <SearchBar />
    //               </div>
    //
    //               {searchPopUpOpen && <SearchPopup handleSearchPopUpClose={handleSearchPopUpClose} />}
    //             </div>
    //           </>
    //         )}
    //       </nav>
    <div></div>
  );
};

export default BurgerMenu;
