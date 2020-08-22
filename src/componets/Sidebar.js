import React from 'react';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibararyMusicIcon from '@material-ui/icons/LibraryMusic';
import './styles/Sidebar.css';
import { useDataLayerValue } from '../DataLayer';

function Sidebar() {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className='sidebar'>
      <img
        className='sidebar_logo'
        src={require('./styles/img/Spotify_Logo.png')}
        alt='spotify-logo'
      />
      <SidebarOption Icon={HomeIcon} tittle='Home' />
      <SidebarOption Icon={SearchIcon} tittle='Search' />
      <SidebarOption Icon={LibararyMusicIcon} tittle='Your Library' />
      <br />
      <strong className='sidebar_title'>PLAYLIST</strong>
      <hr />

      {playlists?.items?.map((playlist) => (
        <SidebarOption key={playlist.id} title={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
