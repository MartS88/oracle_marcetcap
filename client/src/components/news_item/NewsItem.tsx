import React from 'react';
import s from './NewsItem.module.scss';

import { ColorRing } from 'react-loader-spinner';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import NotConnected from '../../pages/not_connected/NotConnected';
import { useGetNewsQuery } from '../../service/cryptoApi';
import { scrollToElement } from '../../utils/scrollUtils';

const NewsItem = () => {
  const { data: coinNews, isError, isLoading } = useGetNewsQuery(100);
  // null,{pollingInterval: 1000}
  const newsData = coinNews?.data?.result;

  const handleImageError = (e: any) => {
    e.target.src = require('../../assets/error.jpg');
  };

  return (
    <div>
      {isError ? (
        <NotConnected />
      ) : isLoading ? (
        <div className="color_ring">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
          />
        </div>
      ) : newsData ? (
        <div className={s.news_block}>
          <div className={s.scroll_block} onClick={() => scrollToElement('scroll_down_button')}>
            <span className={s.scroll_button}>
              {' '}
              Read the latest news <AiOutlineArrowDown size={15} color="blue" />
            </span>
          </div>

          {newsData?.map((news: any) => (
            <div key={news?.id} className={s.news_card}>
              <div className={s.block}>
                <img onError={handleImageError} src={news.imgUrl} alt="img_icon" />
              </div>
              <div className={s.block2}>
                <span className={s.news_title}>{news?.title}</span>

                <a href={news?.link} target="_blank" rel="noopener noreferrer">
                  <span className={s.news_source}>
                    Source : <span className={s.news_source2}>{news?.source}</span>
                  </span>
                </a>
              </div>
            </div>
          ))}

          <div className={s.scroll_block} onClick={() => scrollToElement('scroll_up_button')}>
            <span className={s.scroll_button} id="scroll_down_button">
              Read the top news <AiOutlineArrowUp size={15} color="blue" />
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewsItem;
