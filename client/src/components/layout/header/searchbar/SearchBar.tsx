import React from 'react';
import s from './SearchBar.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  return (
    <div className={s.search_bar}>
      <input type="text" placeholder="Search" /> <AiOutlineSearch color="gray" size={18} />
    </div>
  );
};

export default SearchBar;
