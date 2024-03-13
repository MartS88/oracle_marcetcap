import React, { useEffect, useState } from 'react';
import s from './DexTable.module.scss';
import { useMediaQuery } from 'react-responsive';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { Exchange } from '../../types/exchanges';
import { scrollToElement } from '../../utils/scrollUtils';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

interface DexTableProps {
  exchanges: Exchange[];
}

const DexTable: React.FC<DexTableProps> = ({ exchanges }) => {
  const isMobile = useMediaQuery({ maxWidth: 1180 });
  const maxChars = isMobile ? 8 : 17;

  const [sortedCryptosList, setSortedCryptosList] = useState<Exchange[]>(
    [...exchanges]?.sort((a, b) => b.volume1m - a.volume1m) || [],
  );
  const [directionSort, setDirectionSort] = useState<boolean>(false);
  const [sortedField, setSortedField] = useState<string | null>(null);

  const fieldSort = (field: string) => {
    setDirectionSort(prevDirectionSort => !prevDirectionSort);
    setSortedField(field);

    const sortedList = exchanges ? [...exchanges] : [];

    if (sortedCryptosList) {
      sortedList.sort((a, b) => {
        if (field === 'id') {
          return directionSort ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
        }
        if (field === 'name') {
          return directionSort ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        }

        if (field === 'volume1m') {
          return directionSort ? b.volume1m - a.volume1m : a.volume1m - b.volume1m;
        }
        if (field === 'volume7d') {
          return directionSort ? b.volume7d - a.volume7d : a.volume7d - b.volume7d;
        }

        if (field === 'volume24h') {
          return directionSort ? b.volume24h - a.volume24h : a.volume24h - b.volume24h;
        }

        return 0;
      });
    }

    setSortedCryptosList(sortedList);
  };

  const renderSortIcon = (field: string) => {
    if (sortedField === field) {
      return directionSort ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />;
    }
    return null;
  };
  useEffect(() => {
    if (exchanges && sortedField) {
      fieldSort(sortedField);
    }
  }, [exchanges, sortedField]);

  return (
    <div className={s.tableContainer}>
      <div className={s.scroll_block} onClick={() => scrollToElement('scroll_down_button')}>
        <span className={s.scroll_button}>
          {' '}
          Watch the bottom list <AiOutlineArrowDown size={15} color="blue" />
        </span>
      </div>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.headerCell}></th>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('id')}>
              <div className={s.headerFlex}>
                <span>#</span>
                <span className={s.sortIcon}>{renderSortIcon('id')}</span>
              </div>
            </th>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('name')}>
              <div className={s.headerFlex}>
                <span>Name</span>
                <span className={s.sortIcon}>{renderSortIcon('name')}</span>
              </div>
            </th>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('volume1m')}>
              <div className={s.headerFlex}>
                <span>Trading volume(1m)</span>
                <span className={s.sortIcon}>{renderSortIcon('volume1m')}</span>
              </div>
            </th>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('volume7d')}>
              <div className={s.headerFlex}>
                <span>Trading volume(7d)</span>
                <span className={s.sortIcon}>{renderSortIcon('volume7d')}</span>
              </div>
            </th>
            <th className={`${s.headerCell} ${s.headerCellWithFlex}`} onClick={() => fieldSort('volume24h')}>
              <div className={s.headerFlex}>
                <span>Trading volume(24h)</span>
                <span className={s.sortIcon}>{renderSortIcon('volume24h')}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(exchanges) &&
            ((exchanges && sortedCryptosList) || exchanges).map((exchange: Exchange) =>
              !exchange ? null : (
                <tr key={exchange?.id}>
                  <td style={{ width: '5px' }} className={s.dataCell}></td>
                  <td className={s.dataCell}>{exchange?.id}</td>

                  <td className={s.dataCell}>
                    <a href={exchange?.url} target="_blank" rel="noopener noreferrer">
                      <img src={exchange?.icon} width={35} alt="coin_icon" />

                      {exchange?.name.length > maxChars
                        ? exchange?.name.substring(0, maxChars) + '...'
                        : exchange?.name}
                    </a>
                  </td>
                  <td className={s.dataCell}>${exchange?.volume1m?.toLocaleString()}</td>
                  <td className={s.dataCell}>{exchange?.volume7d?.toLocaleString()}</td>
                  <td className={s.dataCell}>{exchange?.volume24h?.toLocaleString()}</td>
                </tr>
              ),
            )}
        </tbody>
      </table>
      <div className={s.scroll_block} onClick={() => scrollToElement('scroll_up_button')}>
        <span className={s.scroll_button} id="scroll_down_button">
          Watch the top list <AiOutlineArrowUp size={15} color="blue" />
        </span>
      </div>
    </div>
  );
};

export default DexTable;
