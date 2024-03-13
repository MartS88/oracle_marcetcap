import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enUS from 'date-fns/locale/en-US';
import { addYears, getYear, getMonth } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../../store/slice/portfolioSlice';

registerLocale('en-US', enUS);
setDefaultLocale('en-US');

const DateComponent = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const years: number[] = [];
  for (let i = 1990; i <= getYear(new Date()); i++) {
    years.push(i);
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const onChangeHandler = (date: Date) => {
    dispatch(setSelectedDate(startDate.toString())); // Replace with your actual redux action
    setStartDate(date);
  };

  useEffect(() => {
    dispatch(setSelectedDate(startDate.toString())); // Replace with your actual redux action
  }, [startDate, dispatch]);

  return (
    <DatePicker
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div style={{ display: 'flex', justifyContent: 'center', height: '20px', alignItems: 'baseline' }}>
          <button style={{ color: 'black', background: 'transparent' }} onClick={() => decreaseMonth()}>
            {'<'}
          </button>
          <select
            value={getYear(date)}
            onChange={e => setStartDate(addYears(date, parseInt(e.target.value) - getYear(date)))}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={months[getMonth(date)]}
            onChange={e => setStartDate(addYears(date, parseInt(e.target.value) - getYear(date)))}
          >
            {months.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <button style={{ color: 'black', background: 'transparent' }} onClick={() => increaseMonth()}>
            {'>'}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={date => onChangeHandler(date as Date)}
    />
  );
};

export default DateComponent;
