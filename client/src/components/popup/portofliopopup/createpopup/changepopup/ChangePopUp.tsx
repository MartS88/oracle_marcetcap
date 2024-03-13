import React, { useState } from 'react';
import s from './ChangePopUp.module.scss';
import { AiFillRobot, AiOutlineArrowLeft, AiOutlineQuestionCircle, AiOutlineRobot } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setDisplayMode, setPortfolioAvatar } from '../../../../../store/slice/portfolioSlice';
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
import {
  GiCaveman,
  GiGingerbreadMan,
  GiHumanCannonball,
  GiPyromaniac,
  GiRomanToga,
  GiSalamander,
} from 'react-icons/gi';
import { FaSnowman } from 'react-icons/fa';
import { CgPacman } from 'react-icons/cg';
import { GrRobot } from 'react-icons/gr';

const ChangePopUp = () => {
  const dispatch = useDispatch();
  const [selectedSvg, setSelectedSvg] = useState(null);

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

  const svgChangeHandler = (avatar: any) => {
    setSelectedSvg(avatar);
  };
  const savePortfolioAvatar = (selectedSvg: any) => {
    if (selectedSvg !== null) {
      dispatch(setPortfolioAvatar(selectedSvg.type.name));
      dispatch(setDisplayMode(false));
    } else {
      alert('Choose avatar');
    }
  };

  return (
    <div className={s.change_popup}>
      <div className={s.block}>
        <AiOutlineArrowLeft onClick={() => dispatch(setDisplayMode(false))} />
        {selectedSvg === null ? (
          <div className={s.block_logo}>
            <AiOutlineQuestionCircle color="gray" />
          </div>
        ) : (
          <div className={s.block_logo}>{selectedSvg}</div>
        )}
      </div>

      <div className={s.svg_block}>
        <label>How are you feeling about this portfolio?</label>

        <ul className={s.svg_list}>
          {avatarArr.map((avatar, i) => (
            <li key={i} onClick={() => svgChangeHandler(avatar)}>
              {avatar}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => savePortfolioAvatar(selectedSvg)}>Save</button>
    </div>
  );
};

export default ChangePopUp;
