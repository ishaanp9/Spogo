import React, {useEffect} from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './LandingPageAbout.css';
import stadium from './stadium.jpg';
import ethan_spogo from './ethan_spogo.jpg';
import ishaan_spogo from './ishaan_spogo.jpg';
import WebFont from "webfontloader";



const LandingPageAbout = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open_Sans']
      }
    });
   }, []);

  return (
    <>
      <Header />
      <div className="body">
        <div className="topImageWithTextOnIt">
          <h1>We're looking to empower every athlete of any age and level.</h1>
        </div>
        <div className="missionContainer">
          <h1 className="sectionTitle">Our Mission</h1>
          <p>
            <span className='missionFirstSentance'>
              Here at Spogo, we are creating a new way to market and monetize
              your name, image, and likeness.
            </span>
            <br />
            <br /> With Spogo, you can develop a complete, all in one, fully
            customized, athletic profile with all your social media links,
            highlights, experiences, achievements, measurables, and
            testimonials. With just a couple clicks, you can find hundreds of
            monetizable opportunities at your fingertips. In a matter of
            minutes, you can post content that grows your brand and could
            potentially hit the trending page.
            <br />
            <br /> Now goes away the tedious process of sending hundreds and
            even thousands of the same personalized DMs and emails, to brands,
            coaches, recruiters, or whoever it may be, with meager response
            rates. The frustration of posting content on multiple social media
            accounts without validation of them ever being seen. Or, frankly,
            just not having the time to market yourself effectively.
            <br />
            <br />
            Let’s face it. In a growing creator-centered economy, you must know
            how to market yourself. Nowadays, good marketing can be the
            difference between getting athletic scholarships or finalizing a
            brand deal. And, it can be tough knowing that you have the necessary
            skill or value but are just not given the opportunity to do so.
            <br />
            <br /> We want to make it as easy as possible to maximize your name,
            image, and likeness as an athlete without the many hurdles and
            barriers along the way. We want to deliver a simple, easy to use
            platform that serves every athlete. We want you to focus on what’s
            important. And leave the rest to us.
            <br />
            <br /> So stick around, as we are just getting started!
          </p>
        </div>
        <div className="teamContainer">
          <h1 className="sectionTitle">About Us</h1>
          <div className="aboutUsContentContainer">
            <p>
              Ishaan Puri and Ethan Kam founded Spogo in June 2021. They met in
              3rd grade and now study together at the Paul Allen School of
              Computer Science at the University of Washington. <br />
              <br />
              As high school athletes themselves, they understand the struggles
              that athletes continue to face day to day. And, with a shared
              passion for amazing products and new technologies, they created
              Spogo.
            </p>
          </div>
        </div>
        <div className="membersContainer">
          <div className="memberContainer">
            <img src={ishaan_spogo} alt="Ishaan Picture" />
            <div className="founderBioRow">
              <p className="name">Ishaan Puri - Co-Founder</p>
              <p className="sport">High School Sport: Tennis</p>
            </div>
            <div className="founderBioColumn">
              <p className="name">Ishaan Puri</p>
              <p className="sport">Co-Founder</p>
              <p className="sport">High School Sport:</p>
              <p className="sport">Tennis</p>
            </div>
          </div>
          <div className="memberContainer">
            <img src={ethan_spogo} alt="Ethan Kam Picture" />
            <div className="founderBioRow">
              <p className="name">Ethan Kam - Co-Founder</p>
              <p className="sport">High School Sports: Football and Track</p>
            </div>
            <div className="founderBioColumn">
              <p className="name">Ethan Kam</p>
              <p className="sport">Co-Founder</p>
              <p className="sport">High School Sports:</p>
              <p className="sport">Football and Track</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPageAbout;
