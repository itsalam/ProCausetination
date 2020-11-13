import React from 'react';
import logo from '../icons/logo.svg';

function Header() {
  return (
      <header className="App-header">
        <div className="Title">         
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Some Kinda Project
          </p>
        </div>

        <i className="las la-ellipsis-v"></i>
      </header>
  );
}

export default Header;
