import React from 'react';
import './styles/Login.css';
import { loginUrl } from '../spotify';

function Login() {
  return (
    <div className='login'>
      <img src={require('./styles/img/Spotify_Logo.png')} alt='logo' />
      <a href={loginUrl}>Login With Spotify</a>
    </div>
  );
}

export default Login;
