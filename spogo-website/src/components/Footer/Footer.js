import React from 'react';
import './Footer.css';
import BottomSpogoLogo from './SpogoLogo.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bottom_part">
      <div className="no_copyright">
        <div className="bottomLogoContainer">
          <img className="spogo_bottom" src={BottomSpogoLogo} alt="Spogo Logo" />
        </div>
        <div className="bottomTabsContainer">
          <div className="content">
            <div className="header_column">
              <h2>Legal</h2>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </div>
            <div className="header_column">
              <h2>Contact</h2>
              <p onClick={() => window.open('mailto:getspogo@gmail.com')}>
                getspogo@gmail.com
              </p>
            </div>
            <div className="header_column">
              <h2>Pages</h2>
              <Link to={'/home'} className="bottomLinksText">
                <p>Home</p>
              </Link>
              <Link to={'/about'} className="bottomLinksText">
                <p>About</p>
              </Link>
              <Link to={'/blog'} className="bottomLinksText">
                <p>Blog</p>
              </Link>
              <Link to={'/FAQ'} className="bottomLinksText">
                <p>FAQ</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>© 2021 Spogo | All rights reserved</p>
      </div>

    </div>
  );
}

export default Footer;
