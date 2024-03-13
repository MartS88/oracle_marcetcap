import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import s from './CoinOverView.module.scss'
import {useGetAllCoinsQuery} from "../../services/cryptoApi";
import {CSSTransition} from 'react-transition-group';
import CoinInfoPopUp from "./popup/coininfopopup/CoinInfoPopUp";
import {useDispatch, useSelector} from "react-redux";
import {addToWatchList, removeFromWatchList} from "../../store/slice/watchListSlice";
import {ColorRing} from "react-loader-spinner";
import {FaRegCopy} from "react-icons/fa";
import {AiFillStar, AiOutlineArrowRight, AiOutlineCheck, AiOutlineInfoCircle} from "react-icons/ai";
import {BiLogoInternetExplorer} from "react-icons/bi";
import {BsTwitter} from "react-icons/bs";
import copy from 'clipboard-copy';
import ContractPopUp from "./popup/contractpopup/ContractPopUp";
import {SiHiveBlockchain} from "react-icons/si";


const CoinOverView = () => {


    const dispatch = useDispatch()
    const watchListArr = useSelector((state) => state.watchlist.watchListArr)

    const isCoinInWatchList = (coin) => {
        return watchListArr.some(item => item.id === coin.id);
    };

    const addToWatchListAction = (coin) => {
        if (isCoinInWatchList(coin)) {
            dispatch(removeFromWatchList(coin));
        } else {
            dispatch(addToWatchList(coin));
        }
    };


    const [watchListActive, setWatchListIsActive] = useState(false)
    const [infoPopUpActive, setInfoPopUpIsActive] = useState(false)

    const {data: cryptosList} = useGetAllCoinsQuery();
    // {pollingInterval: 1000}
    const coinsData = cryptosList?.result

    const {id} = useParams();

    const coin = coinsData?.find(crypto => crypto?.id === id);

    const [copied, setCopied] = useState(false);
    const handleCopy = () => {

        copy(coin.contractAddress);
        setCopied(true);
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (

        <div className={s.wrapper}>

            {!coin ? (
                <ColorRing

                    visible={true}
                    height="110"
                    width="110"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
                />
            ) : (
                <>


                    <div className={s.title}>
                        <NavLink to='/myoracle'>
                            <h1>Cryptocurrencies</h1>
                        </NavLink>
                        <AiOutlineArrowRight size={21} color='blue'/>
                        <span> {coin?.name} price</span>
                    </div>

                    <div className={s.coin_over_view}>


                        <div className={s.coin_block}>

                            <ul>
                                <li>
                                    <span className={s.rank}>Rank #{coin?.rank}</span>
                                </li>
                                <li>
                                    <img draggable={false} src={coin?.icon}/>
                                    <span className={s.name}>{coin?.name}</span>
                                    <span>{coin.symbol}</span>

                                </li>

                                <li>
                                    <span className={s.price}>${coin?.price.toFixed(2)}</span>
                                    <span
                                        className={`${s.price_changed} ${coin?.priceChange1h > 0 ? s.positive : s.negative}`}>
                                      {coin?.priceChange1h}%
                                </span>


                                    <AiOutlineInfoCircle
                                        size={20}
                                        color="gray"
                                        onMouseEnter={() => setInfoPopUpIsActive(true)}
                                        onMouseLeave={() => setInfoPopUpIsActive(false)}

                                    />


                                    <AiFillStar
                                        className={s.star}
                                        color={isCoinInWatchList(coin) ? 'gold' : 'gray'}
                                        onClick={() => addToWatchListAction(coin)}
                                        onMouseEnter={() => setWatchListIsActive(true)}
                                        onMouseLeave={() => setWatchListIsActive(false)}
                                    />
                                    {watchListActive ? (

                                        <span className={s.watch_list_info}>Add To Main Watchlist and follow coin</span>

                                    ) : (
                                        <div style={{width: '250px'}}></div>
                                    )}

                                </li>

                                <li>
                                    {coin?.priceBtc.toLocaleString()} <span>BTC</span>
                                </li>
                                {infoPopUpActive ? <CoinInfoPopUp coin={coin}/> : null}
                            </ul>
                            <div className={s.ul_block}>
                                <ul className={s.second_ul}>

                                    <li>
                                        Price changed 1d <span
                                        className={`${coin?.priceChange1d > 0 ? s.positive : s.negative}`}>{coin?.priceChange1d}%</span>
                                    </li>

                                    <li>
                                        Price changed 1w <span
                                        className={`${coin?.priceChange1w > 0 ? s.positive : s.negative}`}>{coin?.priceChange1w}%</span>
                                    </li>

                                    <li>
                                        24 Hour Trading Volume <span>${coin?.volume?.toLocaleString()}</span>
                                    </li>

                                </ul>

                                <ul className={s.third_ul}>

                                    <li>
                                        Market Cap <span> ${coin?.marketCap?.toLocaleString()}</span>
                                    </li>

                                    <li>
                                        Circulating Supply <span>${coin?.availableSupply?.toLocaleString()}</span>

                                    </li>
                                    <li>
                                        Total Supply <span>${coin?.totalSupply?.toLocaleString()}</span>
                                    </li>

                                </ul>
                            </div>

                        </div>

                        <div className={s.info_block}>
                            <h2 className={s.info_block_title}>
                                Info
                            </h2>


                            <ul>
                                {coin?.websiteUrl && (

                                    <li>
                                        Website

                                        <a href={coin?.websiteUrl} target="_blank" rel="noopener noreferrer">
                                            <BiLogoInternetExplorer size={21} color='lightblue'/>
                                        </a>

                                    </li>

                                )}

                                {coin?.twitterUrl && (

                                    <li>
                                        Community

                                        <a href={coin?.twitterUrl} target="_blank" rel="noopener noreferrer">
                                            <BsTwitter size={21} color='blue'/>
                                        </a>

                                    </li>
                                )}

                                {coin?.explorers && (

                                    <li>

                                        Explorer

                                        <a href={coin?.explorers[0]} target="_blank" rel="noopener noreferrer">

                                            <SiHiveBlockchain size={21} color='black'/>
                                        </a>

                                    </li>

                                )}

                                {coin?.contractAddress && (
                                    <li>
                                        Contract

                                        {copied ? (
                                            <div>
                                                <AiOutlineCheck size={18} color='green'/>

                                            </div>

                                        ) : (
                                            <FaRegCopy
                                                size={18}
                                                color='black'
                                                onClick={() => handleCopy()}
                                            />
                                        )}
                                    </li>
                                )}


                            </ul>
                        </div>

                        {copied && (
                            <div className={s.contract}>

                                <CSSTransition
                                    in={copied}
                                    timeout={100}
                                    classNames='modal'
                                    unmountOnExit
                                >
                                    <ContractPopUp/>

                                </CSSTransition>

                            </div>


                        )}

                    </div>
                </>
            )}
        </div>
    );
};

export default CoinOverView;