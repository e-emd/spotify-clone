import React, { useEffect } from 'react';
import './App.css';
import Login from './componets/Login';
import Player from './componets/Player';
import { getTokenFromResponse } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // set token
    const hash = getTokenFromResponse();
    window.location.hash = '';
    let spotifyToken = hash.access_token;

    if (spotifyToken) {
      spotify.setAccessToken(spotifyToken);

      dispatch({
        type: 'SET_TOKEN',
        token: spotifyToken,
      });

      dispatch({
        type: 'SET_SPOTIFY',
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      spotify
        .getPlaylist('6uyVungqwEY74Gify83l4X?si=YqUzznGXQgu-OWKuBSf8IA')
        .then((response) => {
          dispatch({
            type: 'SET_DISCOVER_WEEKLY',
            discover_weekly: response,
          });
        });

      spotify.getMyTopArtists().then((response) => {
        dispatch({
          type: 'SET_TOP_ARTISTS',
          top_artists: response,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className='app'>
      {!token ? <Login /> : <Player spotify={spotify} />}
    </div>
  );
}

export default App;
