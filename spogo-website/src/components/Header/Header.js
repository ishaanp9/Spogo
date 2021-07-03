import React from 'react';
import './Header.css';
// import logo from './spogo_logo.png';
// logo has to have no background at all

function Header() {
  return (
    <div className="nav_header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Spogo Logo"
      />
      <div className="nav_buttons">
        <h2 className="nav_text">Home</h2>
        <h2 className="nav_text">About</h2>
        <h2 className="nav_text">Blog</h2>
        <h2 className="nav_text">FAQ</h2>
        <button className="nav_button" type="button">
          Join the Waitlist
        </button>
      </div>
      {/* Logo  */}
      {/* Home */}
      {/* About */}
      {/* Blog */}
      {/* FAQ */}
    </div>
  );
}

export default Header;
