import React, { useEffect, useState } from 'react';
import s from './Trending.module.scss';
import { AiFillFire } from 'react-icons/ai';
import { BiSolidRightArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrending, setTrendingData } from '../../../store/slice/trendingSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { Coin } from '../../../types/cryptocurrencies';

const Trending = ({ coinsData }: { coinsData: Coin[] }) => {
  const selector = useSelector(selectTrending);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   function sortedList() {
  //     if (coinsData && coinsData.length > 0) {
  //       let sortedArr = [...coinsData].sort((a, b) => a.priceChange1h - b.priceChange1h);
  //       return sortedArr.slice(0, 6);
  //     }
  //     return [];
  //   }
  //
  //   // @ts-ignore
  //   setTrendingArr(sortedList());
  //   const trendingData = sortedList();
  //   dispatch(setTrendingData(trendingData));
  // }, [coinsData]);

  return (
    <div className={s.trending_item}>
      <div className={s.trending_title}>
        <AiFillFire size={25} color="orangered" /> <h2>Trending</h2>{' '}
        <span onClick={() => navigate('/trending')}>
          More <BiSolidRightArrowAlt size={20} color="blue" />
        </span>
      </div>

      <ul>
        {selector?.trendingArr &&
          // @ts-ignore
          selector?.trendingArr?.map((item: any) => (
            <NavLink key={item.id} to={`/currencies/${item.id}`}>
              <li key={item.id} className={s.trending_list_item}>
                <img src={item.icon} draggable={false} />

                {item.name}

                <span>{item.symbol}</span>

                <div className={`${s.price_changed} ${item.priceChange1d > 0 ? s.positive : s.negative}`}>
                  {item.priceChange1d}%
                </div>
              </li>
            </NavLink>
          ))}
      </ul>
    </div>
  );
};

export default Trending;
