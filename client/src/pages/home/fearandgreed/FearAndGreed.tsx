import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import s from './FearAndGreed.module.scss';
import { Doughnut } from 'react-chartjs-2';
import { Chart, Title, Tooltip, ArcElement, CategoryScale } from 'chart.js';
import FearAndGreedInfo from './FearAndGreedInfo';
import { useGetFearQuery } from '../../../service/fearApi';
Chart.register(Title, Tooltip, ArcElement, CategoryScale);

const FearAndGreed = () => {
  const { data: fearData, isError, isLoading } = useGetFearQuery({});
  const [isActive, setIsActive] = useState(false);

  const data = {
    labels: ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed'],
    datasets: [
      {
        data: [20, 20, 20, 20, 20],
        backgroundColor: ['#f50739', '#fdd302', '#FFA726', '#b2f1c4', '#00FF0CFF'],
        borderWidth: [1, 1, 1, 1],
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: '90%',
    rotation: -100,
    circumference: 200,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: undefined,
    },
  };

  const customTooltips = function (context: any) {
    const values = [0, 20, 50, 80, 100];
    const label = context.label;
    const index = context.dataIndex;
    const value = values[index];

    return `${label}: ${value}`;
  };

  // @ts-ignore
  options.plugins.tooltip = {
    callbacks: {
      label: customTooltips,
    },
  };

  return (
    <div className={s.fear_item}>
      <div className={s.fear_item_title}>
        <h2>Fear & Greed Index</h2>{' '}
        <AiOutlineInfoCircle
          size={25}
          color="gray"
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {isActive ? (
        <FearAndGreedInfo />
      ) : (
        <>
          <div className={s.fear_block}>
            <Doughnut data={data} />
          </div>
          <div className={s.fear_block2}>
            <span className={s.fear_title}>{fearData?.data[0]?.value}</span>
            <span className={s.fear_title2}>{fearData?.data[0]?.value_classification}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default FearAndGreed;
