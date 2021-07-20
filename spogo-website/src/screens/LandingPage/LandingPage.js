import React, { useState } from "react";
import "./LandingPage.css";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mockup from "./mockup.png";
import ExampleImage from "./top.PNG";
import SpogoTopGraphic from "./spogotopgraphic.png";
import GirlWithTrophyGraphic from './girlwithtrophy.png';
import ShowcaseYourselfGraphic from './showcaseyourselfbaseballplayer.png';
import SocialMediaIntegrationGraphic from './socialmediaintegration.png';
import TailoredCustomizationGraphic from './tailoredcustomization.png';
import LinkInBioGraphic from './linkinbio.png';
import firebase from "../../firebase";
import Footer from "../../components/Footer/Footer";


const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [waitlistInputValid, setWaitlistInputValid] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [waitlistAddSuccessful, setWaitlistAddSuccessful] = useState(false);

  const addUserToWaitlist = async () => {
    await firebase
      .firestore()
      .collection("Waitlist")
      .add({
        name: name,
        email: email,
      })
      .then(() => {
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  let validator = require("email-validator");

  const validateEmail = () => {
    if (validator.validate(email)) {
      addUserToWaitlist();
      setWaitlistAddSuccessful(true)
    } else {
      setInvalidInput(true);
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
            {!waitlistAddSuccessful ? (
              <form onsubmit="return false">
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
                    style={
                      invalidInput
                        ? { borderWidth: 2, borderColor: "red" }
                        : {}
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
                <div className="form_button">
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
              <div className="form_button">
                <button type="button">Thank You!</button>
              </div>
            )}
          </div>
          <div className="imageContainer">
            <img src={Mockup} alt="Phone Mockup" />
          </div>
        </div>
        <div className="product_show_header">
          <h1>This is Spogo.</h1>
          <p className="landing_subtitle">
            Spogo is the premier platform to share your athletic profile. Whether it be to gain exposure to or monetize your name, image and likeness, we’re here to help you along the way.
          </p>
          <img className="main_image" src={GirlWithTrophyGraphic} alt="data" />
        </div>
        <div className="productDescriptionContainer">
          <div className="productDescription">
            <h1>Showcase Yourself</h1>
            <h2>
              Spogo gives you a simple way to post highlights, list your experiences, show off your accomplishments, and display your measurables. These items can be edited and deleted at your convenience, so as you continue along your athletic journey Spogo will be right there with you.
            </h2>
          </div>
          <div className="productDescription">
            <img className="big_image" src={ShowcaseYourselfGraphic} />
          </div>
        </div>
        <div className="productDescriptionContainerInverted">
          <div className="productDescription">
            <img className="big_image" src={SocialMediaIntegrationGraphic} />
          </div>
          <div className="productDescription">
            <h1>Social Media Integration</h1>
            <h2>
              We at Spogo understand that effective marketing as an athlete consists of utilizing all your social media’s, whether you are in high school, college, or even a professional. With that in mind, you can quickly link your Instagram, Twitter, Email, and a link of your choice. Now everyone can access your social media’s all in one place.
            </h2>
          </div>
        </div>
        <div className="productDescriptionContainer">
          <div className="productDescription">
            <h1>Tailored Customization</h1>
            <h2>
              As an athlete it can be hard to stand out. That’s why Spogo gives you a multitude of customization options that allow you to create a profile curated to your preferences and personality. 
            </h2>
          </div>
          <div className="productDescription">
            <img className="big_image" src={TailoredCustomizationGraphic} />
          </div>
        </div>
        <div className="productDescriptionContainerInverted">
          <div className="productDescription">
            <img className="big_image" src={LinkInBioGraphic} />
          </div>
          <div className="productDescription">
            <h1>Use it Anywhere</h1>
            <h2>
              Once you’ve completed your profile, generating your unique URL is effortless. You can paste it on all your social media’s for anyone to view. In addition, send it to coaches, recruiters, teams, agents, and whoever else you have in mind. With Spogo, marketing hasn’t been easier.
            </h2>
          </div>
        </div>
        {/* Bottom Part */}
        <Footer/>
      </div>
    </>
  );
};

export default LandingPage;
