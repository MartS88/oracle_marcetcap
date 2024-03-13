import React, { useEffect, useState } from 'react';
import s from './EditPopUp.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import EditChangePopUp from './editchangepopup/EditChangePopUp';
import { AiFillRobot, AiOutlineClose, AiOutlineQuestionCircle, AiOutlineRobot } from 'react-icons/ai';
import {
  selectPortfolio,
  setDisplayMode,
  setEditPortfolioMode,
  setPortfolioAvatar,
} from '../../../../store/slice/portfolioSlice';

import {
  FcAdvance,
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

const EditPopUp = ({ item }: { item: any }) => {
  const dispatch = useDispatch();
  const portfolio = useSelector(selectPortfolio);
  const [portfolioName, setPortfolioName] = useState('');

  useEffect(() => {
    setPortfolioName(item.name);
  }, [item]);

  const editPortfolioName = async () => {
    const newPortfolioName = portfolioName.trim();
    if (newPortfolioName === '') {
      return alert('The Portfolio name cannot be empty');
    }
    const userId = item?.userId;
    const portfolioId = item?.id;
    try {
      const response = await axios.post(`http://localhost:5000/portfolio/${userId}/update-portfolio/${portfolioId}`, {
        newPortfolioName: newPortfolioName,
        newAvatar: portfolio.portfolioAvatar || item?.avatar,
      });
      closeHandler();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      editPortfolioName();
    } else {
      return;
    }
  };

  const changeHandler = () => {
    dispatch(setDisplayMode(true));
  };

  const avatarArr = [
    <FcManager />,
    <AiFillRobot color="gray" />,
    <LiaRobotSolid />,
    <FaSnowman color="white" />,
    <GiGingerbreadMan color="brown" />,
    <FcAdvance />,
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
    return avatarArr.filter(avatar => avatar.type.name === item.avatar);
  };

  const findAvatar2 = () => {
    return avatarArr.filter(avatar => avatar.type.name === portfolio.portfolioAvatar);
  };

  const closeHandler = () => {
    dispatch(setEditPortfolioMode(false));
    dispatch(setPortfolioAvatar(null));
  };

  return (
    <div style={{ margin: '0 auto' }}>
      {portfolio.displayMode ? (
        <EditChangePopUp item={item} />
      ) : (
        <>
          <div className={s.edit_popup}>
            <div className={s.create_popup_block}>
              <h2>Edit portfolio</h2>
              <AiOutlineClose onClick={closeHandler} />
            </div>

            <div className={s.avatar_block}>
              <div>
                <p>Portfolio avatar</p>
                <div>
                  {portfolio.portfolioAvatar === null ? findAvatar() : findAvatar2()}

                  {/*{item.avatar !== null ? (*/}
                  {/*  portfolio.editPortfolioAvatar ? (*/}
                  {/*    findAvatar2()*/}
                  {/*  ) : (*/}
                  {/*    findAvatar()*/}
                  {/*  )*/}
                  {/*) : (*/}
                  {/*  <AiOutlineQuestionCircle color="gray" />*/}
                  {/*)}*/}
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

            <button onClick={() => editPortfolioName()}>Edit Portfolio</button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditPopUp;
