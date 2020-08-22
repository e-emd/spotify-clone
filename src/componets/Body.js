import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import Header from './Header';
import SongRow from './SongRow';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './styles/Body.css';

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:${id}`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((response) => {
          dispatchEvent({
            type: 'SET_ITEM',
            item: response.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((response) => {
          dispatch({
            type: 'SET_ITEM',
            item: response.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            item: true,
          });
        });
      });
  };

  return (
    <div className='body'>
      <Header spotify={spotify} />

      <div className='body_info'>
        <img src={discover_weekly?.images[0].url} alt='' />
        <div className='body_infoText'>
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className='body_songs'>
        <div className='body_icons'>
          <PlayCircleFilledIcon
            className='body_shuffle'
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>
        {/* List of songs */}
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow key={item.track.id} track={item.track} playSong={playSong} />
        ))}
      </div>
    </div>
  );
}

export default Body;
