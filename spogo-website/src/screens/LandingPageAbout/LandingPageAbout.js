import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './LandingPageAbout.css';
import stadium from './stadium.jpg';
import ethan_spogo from './ethan_spogo.jpg'
import ishaan_spogo from './ishaan_spogo.jpg'

const LandingPageAbout = () => {
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
            Here at Spogo, we are creating the first sharable link in bio
            profile for both High School and College Athletes. With just a few
            clicks, you can develop a complete, all in one, athletic profile
            with all your social media links, highlights, experiences,
            achievements, and measurables. <br />
            <br /> We want to make it as easy as possible to showcase yourself
            with maximum engagement and minimum work. We want you to focus on
            what’s important: your sport. And leave the rest to us. <br />
            <br /> Now goes away the tedious process of sending hundreds and
            even thousands of the same personalized DMs and emails with meager
            response rates. The frustration of posting highlights on multiple
            social media accounts without validation of them ever being seen.
            Or, frankly, just not having the time to market yourself
            effectively. <br />
            <br />
            Let’s face it. In a growing creator-centered economy, you must know
            how to market yourself to recruiters, agents, teams, coaches, or
            whoever it may be. Nowadays, good marketing can be the difference
            between getting an athletic offer from a college or not. And, it can
            be tough knowing that you have the necessary skill to excel but are
            just not given the opportunity to do so. Through Spogo, athletes
            from any location will have equal opportunity to get noticed.
            <br />
            <br /> Our vision at Spogo is just beginning. With college athletes
            finally being allowed to use their name, image, and likeness to
            monetize, we hope to connect athletes to brands, sponsorships,
            events, and more to help them get paid with a simple platform.
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
            <img
              src={ishaan_spogo}
              alt="Ishaan Picture"
            />
            <p className="name">
              Ishaan Puri - Co-Founder
            </p>
            <p className="sport">
              High School Sport: Tennis
            </p>
          </div>
          <div className="memberContainer">
            <img
              src={ethan_spogo}
              alt="Ethan Kam Picture"
            />
            <p className="name">Ethan Kam - Co-Founder</p>
            <p className="sport">High School Sports: Football and Track</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default LandingPageAbout;
