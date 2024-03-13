import React, { useEffect, useState } from 'react';
import s from './Watchlist.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import NotConnected from '../not_connected/NotConnected';
import AddCoin from '../../components/addcoin/AddCoin';
import Table from './table/Table';
import RegistrationForm from '../../components/forms/RegistrationForm';
import LoginForm from '../../components/forms/LoginForm';
import { AiFillStar } from 'react-icons/ai';
import { addToWatchList, selectWatchlist, setWatchListMode } from '../../store/slice/watchListSlice';
import { useGetAllCoinsQuery, useGetWatchListQuery } from '../../service/cryptoApi';
import { ColorRing } from 'react-loader-spinner';
import { selectAuth } from '../../store/authSlice';
import { localStorageService } from '../../service/localStorageService';

const WatchListContent = () => {
  const dispatch = useDispatch();

  const selector = useSelector(selectWatchlist);
  const selectorAuth = useSelector(selectAuth);
  const [selectorFlag, setSelectorFlag] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [showAddCoinsBlock, setShowAddCoinsBlock] = useState<boolean>(false);
  const [watchListButtonActive, setWatchListButtonActive] = useState<boolean>(false);
  const { data: cryptosList, isError, isLoading } = useGetAllCoinsQuery(1000);
  const coinsData = cryptosList?.data?.result || [];

  const clickHandler = () => {
    dispatch(setWatchListMode(true));
  };

  const {
    data: watchListArr,
    error: watchListError,
    isLoading: watchListIsLoading,
    isSuccess,
  } = useGetWatchListQuery(localStorageService.getCredentials()?.id ? localStorageService.getCredentials()?.id : null, {
    pollingInterval: 1000,
  });
  const watchListData = watchListArr?.watchlist;
  const currentList = [
    ...coinsData?.filter((item: any) => {
      return watchListData?.some((coin: any) => item?.symbol === coin?.symbol);
    }),
  ];
  useEffect(() => {
    if (selector?.watchListArr.length === 0 && currentList?.length !== 0 && !selectorFlag) {
      dispatch(addToWatchList(watchListData));
      setSelectorFlag(true);
    }
  }, [watchListData, currentList, coinsData]);

  return (
    <Layout>
      <div className={s.watchlist}>
        <div className={s.wrapper}>
          {isError ? (
            <NotConnected />
          ) : isLoading ? (
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
          ) : (
            <>
              {selectorAuth?.authenticated && localStorage.length > 0 ? (
                <>
                  {watchListData?.length > 0 && selector.watchListMode !== true ? (
                    <div className={s.my_watchlist}>
                      <h2>Watchlist :</h2>

                      <button className={s.new_asset} onClick={() => setShowAddCoinsBlock(!showAddCoinsBlock)}>
                        New Asset +
                      </button>

                      {watchListData?.length > 0 && (
                        <div className={s.watch_list_block}>
                          <Table currentList={currentList} />
                        </div>
                      )}
                      {showAddCoinsBlock && (
                        <div className={s.watchlist_block2}>
                          {
                            <AddCoin
                              coinsData={coinsData}
                              setShowAddCoinsBlock={setShowAddCoinsBlock}
                              currentList={currentList}
                            />
                          }
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={s.my_watchlist}>
                      <h2>Watchlist :</h2>
                      <div className={s.watchlist_block}>
                        <div className={s.star}>
                          <AiFillStar color={watchListButtonActive ? 'gold' : 'gray'} size={30} />
                        </div>
                        <span className={s.watchlist_title}> Your watchlist is empty</span>
                        <span className={s.watchlist_title2}>
                          {' '}
                          Start building your watchlist by clicking the button below.
                        </span>
                        <button
                          onMouseEnter={() => setWatchListButtonActive(true)}
                          onMouseLeave={() => setWatchListButtonActive(false)}
                          onClick={clickHandler}
                          className={s.add_coins}
                        >
                          Add Coins
                        </button>
                      </div>
                      {selector.watchListMode && (
                        <div className={s.watchlist_block2}>
                          <AddCoin
                            coinsData={coinsData}
                            setShowAddCoinsBlock={setShowAddCoinsBlock}
                            currentList={currentList}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {showRegisterForm ? (
                    <>
                      <div className={s.login_block}>
                        <h3 className={s.blockchain_title2}>
                          In order to access the blockchain explorer, you need to
                          <span className={s.login_register_button} onClick={() => setShowRegisterForm(false)}>
                            {' '}
                            log in
                          </span>{' '}
                          or sign up.
                        </h3>
                        <RegistrationForm />
                      </div>
                    </>
                  ) : (
                    <>
                      {' '}
                      <div className={s.login_block}>
                        <h3 className={s.blockchain_title2}>
                          In order to access the blockchain explorer, you need to log in or
                          <span className={s.login_register_button} onClick={() => setShowRegisterForm(true)}>
                            {' '}
                            sign up.
                          </span>{' '}
                        </h3>
                        <LoginForm />
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WatchListContent;

// const isCoinInWatchList = (coin: Coin) => {
//   return selector.watchListArr?.some((coin: Coin) => coin?.id === coin?.id);
// };
// const coinsInWatchList = coinsData ? coinsData.filter((coin: Coin) => isCoinInWatchList(coin)) : [];
// const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
// const existingWatchList = coinsData?.filter((coinInCoinsData: any) => {
//   return watchListData?.some((coinInWatchListData: any) => coinInCoinsData?.id === coinInWatchListData?.coinId);
// });
// useEffect(() => {
//   if (existingWatchList?.length > 0 && !isAddedToWatchlist) {
//     dispatch(addToWatchList(existingWatchList));
//     setIsAddedToWatchlist(true);
//   }
// }, [dispatch, existingWatchList, isAddedToWatchlist, watchListData]);

// return (
//    <Layout>
//      <div className={s.watchlist}>
//        <div className={s.wrapper}>
//          {isError ? (
//             <NotConnected />
//          ) : isLoading ? (
//             <div className="color_ring">
//               <ColorRing
//                  visible={true}
//                  height="110"
//                  width="110"
//                  ariaLabel="blocks-loading"
//                  wrapperStyle={{}}
//                  wrapperClass="blocks-wrapper"
//                  colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
//               />
//             </div>
//          ) : (
//             <>
//               {selectorAuth.authenticated && localStorage.length > 0 ? (
//                  <>
//
//                    {watchListData?.length < 0 && selector.watchListMode !== true ? (
//                       <div className={s.my_watchlist}>
//                         <h2>Watchlist :</h2>
//                         <div className={s.watchlist_block}>
//                           <div className={s.star}>
//                             <AiFillStar color={watchListButtonActive ? 'gold' : 'gray'} size={30} />
//                           </div>
//                           <span className={s.watchlist_title}> Your watchlist is empty</span>
//                           <span className={s.watchlist_title2}>
//                           {' '}
//                             Start building your watchlist by clicking button below.
//                         </span>
//                           <button
//                              onMouseEnter={() => setWatchListButtonActive(true)}
//                              onMouseLeave={() => setWatchListButtonActive(false)}
//                              onClick={clickHandler}
//                              className={s.add_coins}
//                           >
//                             Add Coins
//                           </button>
//                         </div>
//
//                         {showAddCoinsBlock && (
//                            <div className={s.watchlist_block2}>
//                              {
//                                <AddCoin
//                                   coinsData={coinsData}
//                                   setShowAddCoinsBlock={setShowAddCoinsBlock}
//                                   existingWatchList={watchListData}
//                                />
//                              }
//                            </div>
//                         )}
//
//                         <div className={s.watch_list_block}>
//                           <Table currentList={watchListData} />
//                         </div>
//                       </div>
//                    ) : (
//                       <div className={s.my_watchlist}>
//                         <h2>Watchlist :</h2>
//
//                         <div className={s.watchlist_block}>
//                           <div className={s.star}>
//                             <AiFillStar color={watchListButtonActive ? 'gold' : 'gray'} size={30} />
//                           </div>
//
//                           <span className={s.watchlist_title}> Your watchlist is empty</span>
//                           <span className={s.watchlist_title2}>
//                           {' '}
//                             Start building your watchlist by clicking button below.
//                         </span>
//                           <button
//                              onMouseEnter={() => setWatchListButtonActive(true)}
//                              onMouseLeave={() => setWatchListButtonActive(false)}
//                              onClick={clickHandler}
//                              className={s.add_coins}
//                           >
//                             Add Coins
//                           </button>
//                         </div>
//                         {selector.watchListMode && (
//                            <div className={s.watchlist_block2}>
//                              <AddCoin
//                                 coinsData={coinsData}
//                                 setShowAddCoinsBlock={setShowAddCoinsBlock}
//                                 existingWatchList={watchListData}
//                              />
//                            </div>
//                         )}
//                       </div>
//                    )}
//                  </>
//               ) : (
//                  <>
//                    {showRegisterForm ? (
//                       <>
//                         <div className={s.login_block}>
//                           <h3 className={s.blockchain_title2}>
//                             In order to access the blockchain explorer, you need to
//                             <span className={s.login_register_button} onClick={() => setShowRegisterForm(false)}>
//                             {' '}
//                               log in
//                           </span>{' '}
//                             or sign up.
//                           </h3>
//                           <RegistrationForm />
//                         </div>
//                       </>
//                    ) : (
//                       <>
//                         {' '}
//                         <div className={s.login_block}>
//                           <h3 className={s.blockchain_title2}>
//                             In order to access the blockchain explorer, you need to log in or
//                             <span className={s.login_register_button} onClick={() => setShowRegisterForm(true)}>
//                             {' '}
//                               sign up.
//                           </span>{' '}
//                           </h3>
//                           <LoginForm />
//                         </div>
//                       </>
//                    )}
//                  </>
//               )}
//             </>
//          )}
//        </div>
//      </div>
//    </Layout>
// );
// };
//
// export default WatchListContent;
