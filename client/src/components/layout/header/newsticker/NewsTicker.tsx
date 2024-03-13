import React from 'react';
import s from './NewsTicker.module.scss';
import { useGetNewsQuery } from '../../../../service/cryptoApi';
import { NewsItem } from '../../../../types/news';
import { useNavigate } from 'react-router-dom';

const NewsTicker: React.FC = () => {
  const { data: coinNews, isError, isLoading } = useGetNewsQuery(100);
  const newsData = coinNews?.data?.result;
  const navigate = useNavigate();
  return (
    <div id="scroll_up_button" className={s.news_ticker}>
      <div className={s.title}>Crypto News</div>
      <ul>
        {newsData &&
          newsData.map((item: NewsItem) => (
            <a key={item.id} href={item?.sourceLink} target="_blank" rel="noopener noreferrer">
              <li>{item.title}</li>
            </a>
          ))}
      </ul>
    </div>
  );
};

export default NewsTicker;
