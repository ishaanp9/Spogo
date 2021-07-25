import React from 'react';
import './Footer.css';
import BottomSpogoLogo from './SpogoLogo.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

import { SiTiktok } from 'react-icons/si';

function Footer() {
  return (
    <div className="bottom_part">
      <div className="no_copyright">
        <div className="bottomLogoContainer">
          <img
            className="spogo_bottom"
            src={BottomSpogoLogo}
            alt="Spogo Logo"
          />
        </div>
        <div className="bottomTabsContainer">
          <div className="content">
            <div className="header_column">
              <h2>Legal</h2>
              <Link
                to={{
                  pathname:
                    'https://www.iubenda.com/privacy-policy/21046961/legal',
                }}
                target="_blank"
                className="bottomLinksText"
              >
                <p>Privacy Policy</p>
              </Link>
              <Link
                to={{
                  pathname:
                    'https://www.termsofservicegenerator.net/live.php?token=2CbeOQrnTNaEIZa1ncTsUhFSutOp54hZ',
                }}
                target="_blank"
                className="bottomLinksText"
              >
                <p>Terms of Service</p>
              </Link>
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
        <div className="socialIconsFooter">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/getspogo"
          >
            <FaLinkedin
              className="socialIconFooter"
              size={25}
              color={'white'}
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/getspogo"
          >
            <FaTwitter className="socialIconFooter" size={25} color={'white'} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/getspogo/"
          >
            <FaInstagram
              className="socialIconFooter"
              size={25}
              color={'white'}
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tiktok.com"
          >
            <SiTiktok className="socialIconFooter" size={22} color={'white'} />
          </a>
        </div>
        <p>© 2021 Spogo | All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;