import React, { useEffect, useState, useContext } from "react";
import "./SignUpScreen.css";
import {Link} from 'react-router-dom';
import WebFont from "webfontloader";
import SignUpImage from "../../assets/signUpImage.png";
import { AuthContext } from "../../../AuthProvider";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const { register } = useContext(AuthContext);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Open Sans", "Public Sans"],
      },
    });
  }, []);

  let validator = require("email-validator");

  const validateSignup = () => {
    let validSubmission = true;
    if (name != "") {
    } else {
      setInvalidName(true);
      validSubmission = false;
    }
    if (validator.validate(email)) {
    } else {
      setInvalidEmail(true);
      validSubmission = false;
    }
    if (password.length === 0) {
      validSubmission = false;
    }
    if (validSubmission) {
      register(email, password, name)
    }
  };

  return (
    <div className="signUpContainer">
      <div className="signUpDesign1" />
      <div className="signUpDesign2" />
      <div className="signUpFormContainer">
        <h1 className="signUpFormHeader">Sign Up</h1>
        <p className="signUpHeadlineHeader">
          Market and Monetize your Name, Image, and Likeness{" "}
          <span className="signUpHeadlineHeaderLastWord">Here</span>.
        </p>
        <form>
          <div className="signUpInputForms">
            <p className="signUpTextInputHeader" style={{ marginTop: "8%" }}>
              Name
            </p>
            <input
              className="signUpTextInput"
              required
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(text) => {
                setName(text.target.value);
                setInvalidName(false);
              }}
            />
            {invalidName && <h1 className="invalidText">Name is required</h1>}
            <p className="signUpTextInputHeader">Email</p>
            <input
              className="signUpTextInput"
              required
              type="text"
              id="Email"
              value={email}
              onChange={(text) => {
                setEmail(text.target.value);
                setInvalidEmail(false)
              }}
            />
            {invalidEmail && <h1 className="invalidText">Invalid Email</h1>}
            <p className="signUpTextInputHeader">Password</p>
            <input
              className="signUpTextInput"
              required
              type="text"
              id="Password"
              autoComplete="off"
              value={password}
              onChange={(text) => {
                setPassword(text.target.value);
              }}
            />
          </div>
          <button
            className="signUpCreateAccountButton"
            type="button"
            onClick={() => {
              validateSignup();
            }}
          >
            Create Account
          </button>
          <p className="signUpHaveAccountText">
            Already have an account?{" "}
            <Link className="signUpHaveAccountTextSpan" to={"/auth/sign-in"}>
              <span >Sign in</span>
            </Link>
          </p>
        </form>
      </div>
      {/* <div className="signUpImageContainer">
        <img className="signUpImage" src={SignUpImage} />
      </div> */}
    </div>
  );
};

export default SignUpScreen;
