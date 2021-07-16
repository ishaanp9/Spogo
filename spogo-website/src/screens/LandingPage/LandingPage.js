import React, { useState } from "react";
import "./LandingPage.css";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mockup from "./mockup.png";
import ExampleImage from "./top.PNG";
import SpogoTopGraphic from "./spogotopgraphic.png";
import LandingPageProduct from "./landingpageproduct.png";
import LandingPageHighlights from "./landingpagehighlights.png";
import LandingPageTrophies from "./landingpagetrophies.png";
import LandingPageExperiences from "./landingpageexperiences.png";
import LandingPageMeasurables from "./landingpagemeasurables.png";
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
                    Be Notified
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
        <Footer/>
      </div>
    </>
  );
};

export default LandingPage;
