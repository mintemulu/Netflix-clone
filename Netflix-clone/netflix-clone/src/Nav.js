import React from 'react';
import './Nav.css';
import netflixLogo from './netflix_logo.png';

function Nav() {
  return (
    <div className="nav">
      <img
        className="nav__logo"
        src={netflixLogo}
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;
