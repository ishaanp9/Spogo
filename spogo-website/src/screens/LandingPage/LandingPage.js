import React, { useState } from 'react';
import './LandingPage.css';
import Header from '../../components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainImage from './main_image.png';
import ExampleImage from './top.PNG';
import SpogoBottom from './bottom.png';
import LandingPageProduct from './landingpageproduct.png';
import LandingPageHighlights from './landingpagehighlights.png';
import LandingPageTrophies from './landingpagetrophies.png';
import LandingPageExperiences from './landingpageexperiences.png';
import LandingPageMeasurables from './landingpagemeasurables.png';
import firebase from '../../firebase';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [waitlistInputValid, setWaitlistInputValid] = useState(false);

  async function addUserToWaitlist() {
    await firebase
      .firestore()
      .collection('Waitlist')
      .add({
        name: name,
        email: email,
      })
      .then(() => {
        console.log('Worked');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  let handleOnChangeEmail = (email) => {
    setEmail(email.target.value);
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      setWaitlistInputValid(true);
    } else {
      setWaitlistInputValid(false);
    }
  };

  return (
    <>
      <Header />
      <div className="web_body">
        <div className="top_banner">
          <div className="form_area">
            <h1>
              The New Way To Showcase Yourself and Monetize Your Name, Image,
              And Likeness Is Here.
            </h1>
            <p>Find Out More.</p>
            <form>
              <div className="waitlistInputContainer">
                <input
                  maxLength={100}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  className="nameInput"
                  onChange={(text) => setName(text.target.value)}
                />
                <input
                  maxLength={100}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleOnChangeEmail}
                  required={true}
                />
              </div>
              <div className="form_button">
                <button
                  onClick={() =>
                    waitlistInputValid ? addUserToWaitlist() : null
                  }
                >
                  Join the Waitlist
                </button>
              </div>
            </form>
          </div>
          <div className="imageContainer">
            <img src={ExampleImage} alt="" />
          </div>
        </div>
        <div className="product_show_header">
          <h1>This is Spogo.</h1>
          <p className="landing_subtitle">
            Spogo is the only platform Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </p>
          <img className="main_image" src={LandingPageProduct} alt="data" />
        </div>
        <div className="productDescriptionContainer">
          <div className="productDescription">
            <h1>Show your highlights to the world!</h1>
            <h2>
              Post your highlights to your Spogo account. Then, show off your
              tape to coaches and friends.
            </h2>
          </div>
          <div className="productDescription">
            <img className="big_image" src={LandingPageHighlights} />
          </div>
        </div>
        <div className="productDescriptionContainerInverted">
          <div className="productDescription">
            <img className="big_image" src={LandingPageTrophies} />
          </div>
          <div className="productDescription">
            <h1>Tell everyone about your accomplishments!</h1>
            <h2>
              In the trophies section of your profile, you can display all of
              your accomplishments. Tell everyone about your individual and team
              awards.
            </h2>
          </div>
        </div>
        <div className="productDescriptionContainer">
          <div className="productDescription">
            <h1>Share your experiences!</h1>
            <h2>
              In the experiences section of your profile, you can display all of
              your accomplishments. Tell everyone about your individual and team
              awards.
            </h2>
          </div>
          <div className="productDescription">
            <img className="big_image" src={LandingPageExperiences} />
          </div>
        </div>
        <div className="productDescriptionContainerInverted">
          <div className="productDescription">
            <img className="big_image" src={LandingPageMeasurables} />
          </div>
          <div className="productDescription">
            <h1>Confirm your measurables!</h1>
            <h2>
              In the experiences section of your profile, you can display all of
              your accomplishments. Tell everyone about your individual and team
              awards.
            </h2>
          </div>
        </div>
        {/* Bottom Part */}
        <div className="bottom_part">
          <div className="no_copyright">
            <div className="bottomLogoContainer">
              <img
                className="spogo_bottom"
                src={SpogoBottom}
                alt="Spogo Logo"
              />
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
                  <p
                    onClick={() => window.open(
                      'mailto:getspogo@gmail.com'
                    )}
                  >
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
      </div>
    </>
  );
};

export default LandingPage;
