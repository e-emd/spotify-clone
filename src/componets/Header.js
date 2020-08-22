import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from '../DataLayer';
import './styles/Header.css';

function Header() {
  const [{ user }] = useDataLayerValue();

  return (
    <div className='header'>
      <div className='header_left'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Search for Artist, Songs, or Playlists'
        />
      </div>
      <div className='header_right'>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
