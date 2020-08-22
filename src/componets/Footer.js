import React, { useEffect } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShufflelIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { Grid, Slider } from '@material-ui/core';
import { useDataLayerValue } from '../DataLayer';
import './styles/Footer.css';

function Footer({ spotify }) {
  const [{ item, playig }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((res) => {
      console.log('res: ', res);

      dispatch({
        type: 'SET_PLAYING',
        playig: res.is_playing,
      });

      dispatch({
        type: 'SET_ITEM',
        item: res.item,
      });
    });
  }, [spotify, dispatch]);

  const handlePlayPause = () => {
    if (playig) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playig: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: 'SET_PLAYING',
        playig: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: 'SET_ITEM',
        item: res.item,
      });
      dispatch({
        type: 'SET_PLAYING',
        playig: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: 'SET_ITEM',
        playing: res.item,
      });
      dispatch({
        type: 'SET_PLAYING',
        playig: true,
      });
    });
  };

  return (
    <div className='footer'>
      <div className='footer_left'>
        <img
          className='footer_albumLogo'
          src={item?.album.images[0].url}
          alt={item}
        />
        {item ? (
          <div className='footer_songInfo'>
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ) : (
          <div className='footer_songInfo'>
            <h4>No song is playin</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className='footer_center'>
        <ShufflelIcon className='footer_green' />
        <SkipPreviousIcon className='footer_icon' onClick={skipNext} />
        {playig ? (
          <PauseCircleOutlineIcon
            fontSize='large'
            className='footer_icon'
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleOutlineIcon
            fontSize='large'
            className='footer_icon'
            onClick={handlePlayPause}
          />
        )}
        <SkipNextIcon className='footer_icon' onClick={skipPrevious} />
        <RepeatIcon className='footer_green' />
      </div>

      <div className='footer_right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
