import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from './spogo_logo.png';
import top from './top.PNG';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MixpanelConsumer } from 'react-mixpanel';
import WebFont from 'webfontloader';
// logo has to have no background at all

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open_Sans'],
      },
    });
  }, []);

  return (
    <MixpanelConsumer>
      {(mixpanel) => (
        <div className="navbar">
          <div className="navbar-container container">
            <Link
              onClick={() =>
                mixpanel.track('Header Tabs Pressed', {
                  'Tab Pressed': 'Home',
                })
              }
              to="/"
              className="headerSpogoLogo"
            >
              <img src={logo} alt="Spogo Logo" />
            </Link>
            <div className="headerMenuIcon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="headerItem">
                <Link
                  onClick={() =>
                    mixpanel.track('Header Tabs Pressed', {
                      'Tab Pressed': 'Home',
                    })
                  }
                  to="/"
                  className="headerLinks"
                >
                  Home
                </Link>
              </li>
              <li className="headerItem">
                <Link
                  onClick={() =>
                    mixpanel.track('Header Tabs Pressed', {
                      'Tab Pressed': 'About',
                    })
                  }
                  to="/about"
                  className="headerLinks"
                >
                  About
                </Link>
              </li>
              {/* <li className="headerItem">
                <Link
                  onClick={() =>
                    mixpanel.track('Header Tabs Pressed', {
                      'Tab Pressed': 'Blog',
                    })
                  }
                  to="/blog"
                  className="headerLinks"
                >
                  Blog
                </Link>
              </li> */}
              <li className="headerItem">
                <Link
                  onClick={() =>
                    mixpanel.track('Header Tabs Pressed', {
                      'Tab Pressed': 'FAQ',
                    })
                  }
                  to="/FAQ"
                  className="headerLinks"
                >
                  FAQ
                </Link>
              </li>
              {/* <Link to="/auth" className="loginLinkButton"> */}
                <li className="loginHeaderButton">
                  <button
                    onClick={() => {
                      window.location.assign('/auth')
                      mixpanel.track('Header Tabs Pressed', {
                        'Tab Pressed': 'Login',
                      })
                    }}
                    type="text"
                  >
                    Login
                  </button>
                </li>
              {/* </Link> */}
              <Link to="/waitlist" className="waitlistLinkBtn">
                <li className="headerButton">
                  <button
                    onClick={() =>
                      mixpanel.track('Header Tabs Pressed', {
                        'Tab Pressed': 'Waitlist',
                      })
                    }
                    type="text"
                  >
                    Join Waitlist
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </MixpanelConsumer>
  );
}

export default Header;
