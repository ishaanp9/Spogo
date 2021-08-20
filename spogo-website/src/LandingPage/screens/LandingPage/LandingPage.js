import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Header from '../../components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Mockup from './mockup.png';
import ExampleImage from './top.PNG';
import SpogoTopGraphic from './spogotopgraphic.png';
import GirlWithTrophyGraphic from './girlwithtrophy.png';
import ShowcaseYourselfGraphic from './showcaseyourselfbaseballplayer.png';
import SocialMediaIntegrationGraphic from './socialmediaintegration.png';
import TailoredCustomizationGraphic from './tailoredcustomization.png';
import LinkInBioGraphic from './linkinbio.png';
import firebase from '../../../firebase';
import { MixpanelConsumer } from 'react-mixpanel';
import Footer from '../../components/Footer/Footer';
import WebFont from 'webfontloader';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [waitlistInputValid, setWaitlistInputValid] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [waitlistAddSuccessful, setWaitlistAddSuccessful] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);

  const addUserToWaitlist = async () => {
    await firebase
      .app('secondary')
      .auth()
      .createUserWithEmailAndPassword(email, 'password')
      .catch((error) => {
        console.log('Error:', error);
      });
    // await firebase
    //   .firestore()
    //   .collection("Waitlist")
    //   .add({
    //     name: name,
    //     email: email,
    //   })
    //   .then(() => {
    //     setName("");
    //     setEmail("");
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });

    // const apps = firebase.apps;

    // apps.forEach(app => {
    //   console.log('App name: ', app.name);
    // });
  };

  let validator = require('email-validator');

  const validateEmail = () => {
    if (validator.validate(email)) {
      addUserToWaitlist();
      <MixpanelConsumer>
        {(mixpanel) => mixpanel.track('Waitlist User Added')}
      </MixpanelConsumer>;
      setWaitlistAddSuccessful(true);
    } else {
      setInvalidInput(true);
    }
  };
  return (
    <>
      <Header onClick={window.scrollTo(0, 0)} />
      <div className="landingPageBody">
        <div className="topLandingPageContentBannerContainer">
          <div className="landingPageWaitlistContentContainer">
            <h1>
              The New Way To Market and Monetize Your Name, Image, And Likeness
              Is Here.
            </h1>
            <p>Find Out More.</p>
            <div
              className='landingPageTopButtonsContainer'
            >
              <Link to='/auth' className="waitlistButton">
                <button
                  type="button"
                  onClick={
                    () => validateEmail()
                    // ? addUserToWaitlist() : null
                  }
                  style={{ marginBottom: '2%' }}
                >
                  Start building your Profile
                </button>
              </Link>
              <Link  className="waitlistButton">
                <button type="button">Join Waitlist</button>
              </Link>
            </div>
            {/* <div
              style={{
                marginBottom: '2%',
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {window.innerWidth > 600 ? <hr style={{ width: '10%' }} /> : null}
              <p style={{ fontSize: 14, textAlign: 'center' }}>
                and be notified when new features come out (marketplace, feed)
              </p>
              {window.innerWidth > 600 ? <hr style={{ width: '10%' }} /> : null}
            </div> */}
            {/* {!waitlistAddSuccessful ? (
              <form onsubmit="return false">
                <div className="waitlistInputContainer">
                  <input
                    maxLength={100}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    className="waitlistFullNameInput"
                    onChange={(text) => setName(text.target.value)}
                  />
                  <input
                    style={
                      invalidInput ? { borderWidth: 2, borderColor: 'red' } : {}
                    }
                    maxLength={100}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(text) => {
                      setEmail(text.target.value);
                      setInvalidInput(false);
                    }}
                    required={true}
                  />
                </div>
                {invalidInput && (
                  <div className="invalidEmailTextContainer">
                    <h1 className="invalidText">Invalid Email</h1>
                  </div>
                )}
                <div className="waitlistButton">
                  <button
                    type="button"
                    onClick={
                      () => validateEmail()
                      // ? addUserToWaitlist() : null
                    }
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            ) : (
              <div className="waitlistButton">
                <button type="button">Thank You!</button>
              </div>
            )} */}
          </div>
          <div className="landingPageTopImageMockupContainer">
            <img src={Mockup} alt="Phone Mockup" />
          </div>
        </div>
        <div className="mainProductHeader">
          <h1>This is Spogo.</h1>
          <p className="mainProductHeaderSubtitle">
            Spogo is the premier platform to market and monetize your name,
            image, and likeness. Whether it is finding opportunities or sharing
            content, every athlete has something to do on Spogo. So as you
            continue along your athletic journey, Spogo will be right there with
            you.{' '}
          </p>
          <img
            className="mainProductHeaderImage"
            src={GirlWithTrophyGraphic}
            alt="data"
          />
        </div>
        <div className="productDescriptionContainer">
          <div className="productDescription">
            <h1>Showcase Yourself</h1>
            <h2>
              It has never been easier to showcase your athletic profile. With
              Spogo, you can link all your social media’s, post highlights, list
              experiences, show off accomplishments, display measurables, and
              receive testimonials. To help you best stand out, we provide a
              multitude of customization options that allow you to create a
              profile curated to your preferences and personality. Once you’ve
              completed your profile, generate and share your unique Spogo URL
              for everyone to see.
            </h2>
          </div>
          <div className="productDescription">
            <img className="productBigImage" src={ShowcaseYourselfGraphic} />
          </div>
        </div>
        <div className="productDescriptionContainerInverted">
          <div className="productDescription">
            <img
              className="productBigImage"
              src={SocialMediaIntegrationGraphic}
            />
          </div>
          <div className="productDescription">
            <h1>Find Opportunities</h1>
            <h2>
              At Spogo, we understand that as an athlete you want to maximize
              your value. We know that finding monetizable opportunities can be
              difficult and time consuming. That’s why we’ve built an all in one
              marketplace to link you to your next partnership. Through our
              simple platform, you can search, apply, and get connected to your
              next opportunity in just a few clicks.
            </h2>
          </div>
        </div>
        <div className="productDescriptionContainer">
          <div className="productDescription">
            <h1>Get Noticed</h1>
            <h2>
              Spogo provides a unique way to generate exposure and grow your
              brand through an innovative public, private, and trending feed
              concept. Since the public feed is the first feed you see, you can
              generate impressions with your athletic content and find people
              you never knew existed. With the private feed, catch up and
              interact with those you know best. On our trending page, explore
              what’s going viral. With Spogo, it could even be you!
            </h2>
          </div>
          <div className="productDescription">
            <img
              className="productBigImage"
              src={TailoredCustomizationGraphic}
            />
          </div>
        </div>
        {/* <div className="productDescriptionContainerInverted">
          <div className="productDescription">
            <img className="productBigImage" src={LinkInBioGraphic} />
          </div>
          <div className="productDescription">
            <h1>Use it Anywhere</h1>
            <h2>
              Once you’ve completed your profile, generating your unique URL is effortless. You can paste it on all your social media’s for anyone to view. In addition, send it to coaches, recruiters, teams, agents, and whoever else you have in mind. With Spogo, marketing hasn’t been easier.
            </h2>
          </div>
        </div> */}
        {/* Bottom Part */}
        <Footer onClick={window.scrollTo(0, 0)} />
      </div>
    </>
  );
};

export default LandingPage;
