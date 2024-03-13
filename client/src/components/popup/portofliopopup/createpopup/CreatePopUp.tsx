import React, { useEffect, useState } from 'react';
import s from './CreatePopUp.module.scss';
import { AiFillRobot, AiOutlineClose, AiOutlineQuestionCircle, AiOutlineRobot } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPortfolio,
  setActiveItem,
  setCreatePortfolioMode,
  setDisplayMode,
  setPortfolioAvatar,
} from '../../../../store/slice/portfolioSlice';
import ChangePopUp from './changepopup/ChangePopUp';
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
import axios from 'axios';
import { localStorageService } from '../../../../service/localStorageService';

const CreatePopUp = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(selectPortfolio);
  const [portfolioName, setPortfolioName] = useState('');
  const portfolioMode = portfolio.portfolioMode;

  const handleEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      addPortfolioHandler();
    } else {
      return;
    }
  };

  const changeHandler = () => {
    dispatch(setDisplayMode(true));
  };
  useEffect(() => {}, [portfolio]);
  const addPortfolioHandler = async () => {
    if (portfolio.portfolioAvatar === null) {
      return alert(`Please choose your portfolio avatar`);
    }
    try {
      const newPortfolioName = portfolioName.trim();

      if (newPortfolioName === '') {
        return alert('The Portfolio name cannot be empty');
      }

      const response = await axios.post(
        `http://localhost:5000/portfolio/${localStorageService.getCredentials()?.id}/create`,
        {
          name: newPortfolioName,
          avatar: portfolio.portfolioAvatar,
        },
      );

      if (response.data.error === 'Portfolio with this name already exists for the user') {
        return alert(`${response.data.error}`);
      }
      setPortfolioName('');
      dispatch(setPortfolioAvatar(null));
      dispatch(setCreatePortfolioMode(false));
      return response;
    } catch (error: any) {
      console.error('Error', error);
      dispatch(setCreatePortfolioMode(true));
    }
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

  const findAvatar = () => {
    return avatarArr.find(item => item.type.name === portfolio.portfolioAvatar);
  };

  const closeHandler = () => {
    dispatch(setCreatePortfolioMode(false));
    dispatch(setPortfolioAvatar(null));
  };

  return (
    <div style={{ margin: '0 auto' }}>
      {portfolio.displayMode ? (
        <ChangePopUp />
      ) : (
        <>
          <div className={s.create_popup}>
            <div className={s.create_popup_block}>
              <h2>Create portfolio</h2>
              <AiOutlineClose onClick={closeHandler} />
            </div>

            <div className={s.avatar_block}>
              <div>
                <p>Portfolio avatar</p>
                <div>
                  {portfolio.portfolioAvatar !== null ? findAvatar() : <AiOutlineQuestionCircle color="gray" />}
                </div>
              </div>

              <button className={s.change} onClick={() => changeHandler()}>
                Change
              </button>
            </div>

            <div className={s.floor_block}>
              <label>Portfolio name</label>

              <input
                onChange={e => setPortfolioName(e.target.value)}
                value={portfolioName}
                onKeyPress={handleEnterPress}
                type="text"
                maxLength={22}
                placeholder="Enter your portfolio name"
              />
              <span>{portfolioName.length}/22 characters</span>
            </div>

            <button onClick={addPortfolioHandler}>Create Portfolio</button>
          </div>
        </>
      )}
    </div>
  );
};
export default CreatePopUp;
