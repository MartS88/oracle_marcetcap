import React, { useEffect, useState } from 'react';
import s from './ComNewsItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useGetNewsQuery } from '../../../../service/cryptoApi';
import NotConnected from '../../../not_connected/NotConnected';

const ComNewsItem = () => {
  const navigate = useNavigate();
  const { data: coinNews, isError, isLoading } = useGetNewsQuery({});
  const newsData = coinNews?.data?.result;
  const [newsItem, setNewsItem] = useState(newsData ? newsData[0] : null);

  const findIndex = () => {
    if (newsData && newsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * newsData.length);
      setNewsItem(newsData[randomIndex]);
    }
  };

  useEffect(() => {
    findIndex();
    const intervalId = setInterval(() => {
      findIndex();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [newsData]);

  const handleImageError = (e: any) => {
    e.target.src = require('../../../../assets/error.jpg');
  };

  return (
    <div>
      {isError ? (
        <NotConnected />
      ) : isLoading ? (
        <div
          style={{
            paddingTop: '50px',
            transform: 'translateX(650px)',
            height: '800px',
          }}
        >
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
      ) : newsItem ? (
        <div className={s.news_block}>
          <div className={s.block1}>
            <a href={newsItem?.link} target="_blank" rel="noopener noreferrer">
              <img onError={handleImageError} src={newsItem?.imgUrl} alt="img_icon" />
            </a>
          </div>

          <div className={s.block2}>
            <h2>{newsItem?.title}</h2>
            <a href={newsItem?.link} target="_blank" rel="noopener noreferrer">
              <div>
                Source:
                <span>{newsItem?.source}</span>
              </div>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ComNewsItem;
