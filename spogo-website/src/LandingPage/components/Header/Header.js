import React, { useState } from 'react';
import './Header.css';
import logo from './spogo_logo.png';
import top from './top.PNG';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
// logo has to have no background at all

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <div className="navbar">
        <div className="navbar-container container">
          <Link to="/home" className="navbar-logo">
            <img src={logo} alt="Spogo Logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links">
                About
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/blog" className="nav-links">
                Blog
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/FAQ" className="nav-links">
                FAQ
              </Link>
            </li>
            <Link to="/" className="waitlistLinkBtn" >
              <li className="nav-btn">
                <button type="text">Join Waitlist</button>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;


