import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.scss'

const SearchBar = props => {
  const [searchData, setSearchData] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchData);
  }

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="Search"
        name="search"
        className="search-community"
        onChange={(e) => setSearchData(e.target.value)}
         />
        <button
          type="submit"
          className="search-community-icon"
        >
          <FaSearch />
        </button>
    </form>
  );
};

export default SearchBar;
