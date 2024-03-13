import React, { useState, useEffect, useRef } from 'react';
import s from './Dashboard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPortfolio,
  setActiveItem,
  setAddTransactionMode,
  setCreatePortfolioMode,
  setEditPortfolioMode,
  setRemoveMode,
  setSelectCoinMode,
  setTransactionName,
  setTransactionsMode,
} from '../../store/slice/portfolioSlice';

import { BsFillBriefcaseFill, BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus, AiFillRobot, AiOutlineRobot, AiOutlineQuestionCircle, AiFillCheckCircle } from 'react-icons/ai';
import {
  FcAndroidOs,
  FcBadDecision,
  FcBearish,
  FcBiohazard,
  FcBusinessman,
  FcBusinesswoman,
  FcManager,
} from 'react-icons/fc';
import { LiaRobotSolid } from 'react-icons/lia';
import { FaSnowman } from 'react-icons/fa';
import {
  GiCaveman,
  GiGingerbreadMan,
  GiHumanCannonball,
  GiPyromaniac,
  GiRomanToga,
  GiSalamander,
} from 'react-icons/gi';
import { CgPacman } from 'react-icons/cg';
import { GrRobot } from 'react-icons/gr';
import { PiDotsSixBold } from 'react-icons/pi';
import { FiEdit2 } from 'react-icons/fi';
import DashBoardStats from './DashboardStats';

import SelectCoin from '../addtransaction/selectcoin/SelectCoin';
import { useGetAllCoinsQuery, useGetPortfoliosQuery } from '../../service/cryptoApi';
import DotsPopUp from '../popup/portofliopopup/dotspopup/DotsPopUp';
import EditPopUp from '../popup/portofliopopup/editpopup/EditPopUp';
import PortfolioError from '../popup/portofliopopup/portfolioerror/PortfolioError';
import AddTransaction from '../addtransaction/AddTransatcion';
import CreatePopUp from '../popup/portofliopopup/createpopup/CreatePopUp';
import { localStorageService } from '../../service/localStorageService';

const Dashboard = () => {
  const { data: cryptosList } = useGetAllCoinsQuery(1000);
  // null, {pollingInterval: 1000}
  const coinsData = cryptosList?.data?.result;

  const {
    data: portfolioData,
    isError,
    isLoading,
  } = useGetPortfoliosQuery(localStorageService.getCredentials()?.id, {
    pollingInterval: 5000,
  });
  const portfolio = useSelector(selectPortfolio);
  const portfolioMode = portfolio.portfolioMode;
  const editPortfolioMode = portfolio.editPortfolioMode;
  const removeMode = portfolio.removeMode;
  const selectCoinMode = portfolio.selectCoinMode;
  const addTransactionMode = portfolio.addTransactionMode;
  const totalProfitLoss = portfolio.totalProfitLoss;
  const activeItem = portfolio.activeItem;
  const dispatch = useDispatch();
  const [dashboardActive, setDashboardActive] = useState<boolean>(false);
  const [dotsPopUpActive, setDotsPopUpIsActive] = useState<boolean>(false);

  const handleItemClick = (item: any) => {
    setDotsPopUpIsActive(!dotsPopUpActive);
  };

  const handleCloseDotsPopUp = () => {
    dispatch(setEditPortfolioMode(false));
    setDotsPopUpIsActive(!dotsPopUpActive);
  };

  const activeHandler = (item: any) => {
    dispatch(setActiveItem(item));
    dispatch(setTransactionsMode(false));
    dispatch(setTransactionName(null));
  };

  const avatarArr = [
    <FcManager />,
    <AiFillRobot color="gray" />,
    <LiaRobotSolid />,
    <FaSnowman color="white" />,
    <GiGingerbreadMan color="brown" />,
    <AiOutlineQuestionCircle color="gray" />,
    <GiCaveman />,
    <AiOutlineRobot />,
    <GiHumanCannonball color="red" />,
    <FcBusinesswoman />,
    <GiRomanToga />,
    <FcAndroidOs />,
    <GiSalamander color="red" />,
    <FcBadDecision />,
    <GiPyromaniac color="orangered" />,
    <FcBusinessman />,
    <CgPacman color="yellow" />,
    <FcBearish />,
    <GrRobot />,
    <FcBiohazard />,
  ];

  const createHandler = () => {
    dispatch(setRemoveMode(false));
    dispatch(setSelectCoinMode(false));
    dispatch(setAddTransactionMode(false));
    dispatch(setEditPortfolioMode(false));
    dispatch(setTransactionsMode(false));
    dispatch(setTransactionName(null));
    dispatch(setCreatePortfolioMode(true));
  };

  const addTransactionHandler = () => {
    dispatch(setAddTransactionMode(false));
    dispatch(setRemoveMode(false));
    dispatch(setEditPortfolioMode(false));
    dispatch(setCreatePortfolioMode(false));
    dispatch(setTransactionsMode(false));
    dispatch(setTransactionName(null));
    dispatch(setSelectCoinMode(true));
  };

  const [activeItemFlag, setActiveItemFlag] = useState<boolean>(false);

  useEffect(() => {
    if (portfolioData?.portfolios.length > 0 && !activeItemFlag) {
      dispatch(setActiveItem(portfolioData?.portfolios[0]));
      setActiveItemFlag(true);
    }
  }, [portfolioData?.portfolios?.length, setActiveItemFlag]);

  return (
    <div className={s.dashboard}>
      {portfolioData?.portfolios?.length === 0 && (
        <div className={s.no_portfolio}>
          <img src={require('../../assets/no-portfolio.png')} width={300} draggable={false} />
          <h2>Let’s get started with your first portfolio!</h2>
          <p>Track profits, losses and valuation all in one place.</p>
          <button onClick={createHandler}>Create Portfolio</button>
        </div>
      )}

      {portfolioData?.portfolios?.length > 0 && (
        <div className={s.dashboard}>
          <div className={s.dashboard_block}>
            <div className={s.dashboard_title}>
              <div className={s.svg_div}>
                <BsFillBriefcaseFill color="white" />
              </div>

              <div>
                <p>Dashboard</p>

                {activeItem && activeItem.totalProfitLoss !== undefined ? (
                  <span>{totalProfitLoss && activeItem?.totalProfitLoss}$</span>
                ) : (
                  <span></span>
                )}
              </div>
            </div>

            <div className={s.portfolio_names}>
              <div className={s.portfolio_names_title}>
                <h2>Portfolio</h2>

                {dashboardActive ? (
                  <AiFillCheckCircle onClick={() => setDashboardActive(false)} />
                ) : (
                  <FiEdit2 onClick={() => setDashboardActive(true)} />
                )}
              </div>

              <ul>
                {dashboardActive
                  ? portfolioData?.portfolios?.length > 0 &&
                    portfolioData?.portfolios?.map((item: any) => (
                      <li
                        key={item.id}
                        onClick={() => activeHandler(item)}
                        className={`${s.portfolio_names_name} ${activeItem === item ? s.active : ''}`}
                      >
                        <div key={item.id} className={s.dots}>
                          <PiDotsSixBold />
                        </div>
                        <div className={s.div_svg}>
                          {avatarArr.find(avatar => avatar.type.name === item.avatar) || (
                            <AiOutlineQuestionCircle color="gray" />
                          )}
                        </div>
                        <div className={s.div_span}>
                          <span className={s.name}>
                            {item?.name?.length > 10 ? item.name.substring(0, 10) + '...' : item.name}
                          </span>
                          {item.totalProfitLoss && <span className={s.total_profit}>{item.totalProfitLoss}$</span>}
                        </div>

                        <div className={s.dots2}>
                          <BsThreeDots onClick={() => handleItemClick(item)} />
                        </div>
                      </li>
                    ))
                  : portfolioData?.portfolios?.length > 0 &&
                    portfolioData?.portfolios?.map((item: any) => (
                      <li
                        style={{ gap: '10px' }}
                        key={item?.id}
                        className={`${s.portfolio_names_name} ${activeItem === item ? s.active : ''}`}
                      >
                        <div className={s.div_svg}>
                          {avatarArr.find(avatar => avatar.type.name === item?.avatar) || (
                            <AiOutlineQuestionCircle color="gray" />
                          )}
                        </div>
                        <div className={s.div_span}>
                          <span className={s.name}>
                            {item?.name?.length > 13 ? item?.name.substring(0, 13) + '...' : item?.name}
                          </span>

                          {item.totalProfitLoss && <span className={s.total_profit}>{item.totalProfitLoss}$</span>}
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
            <div onClick={addTransactionHandler} className={s.floor_block}>
              <div className={s.floor_div}>
                <AiOutlinePlus />
              </div>
              <button className={s.create_portfolio}>+ Add Transaction</button>
            </div>
            <div onClick={createHandler} className={s.floor_block}>
              <div className={s.floor_div}>
                <AiOutlinePlus />
              </div>
              <button onClick={createHandler} className={s.create_portfolio}>
                Create Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {portfolioData?.portfolios?.length > 0 && activeItem !== null && (
        <div className={s.dashboardstats}>
          <DashBoardStats item={activeItem} coinsData={coinsData} />
        </div>
      )}

      {coinsData && addTransactionMode && (
        <div className={s.action_mode}>
          <div className={s.action_mode_block}>
            <AddTransaction coinsData={coinsData} item={activeItem} />
          </div>
        </div>
      )}

      {selectCoinMode && (
        <div className={s.action_mode}>
          <div className={s.action_mode_block}>
            <SelectCoin coinsData={coinsData} />
          </div>
        </div>
      )}

      {editPortfolioMode && (
        <div className={s.action_mode}>
          <div className={s.action_mode_block}>
            <EditPopUp item={activeItem} />
          </div>
        </div>
      )}

      {activeItem && dotsPopUpActive && (
        <div className={s.action_mode}>
          <div className={s.action_mode_block}>
            <DotsPopUp item={activeItem} onClose={handleCloseDotsPopUp} setDotsPopUpIsActive={setDotsPopUpIsActive} />
          </div>
        </div>
      )}

      {removeMode && (
        <div className={s.action_mode}>
          <div className={s.action_mode_block}>
            <PortfolioError item={activeItem} />
          </div>
        </div>
      )}

      {portfolioMode && (
        <div className={s.action_mode}>
          <div className={s.action_mode_block}>
            <CreatePopUp />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
