import React, { useEffect, useState, useContext } from "react";
import "./SignUpScreen.css";
import { Link, useHistory } from "react-router-dom";
import WebFont from "webfontloader";
import SignUpImage from "../../assets/signUpImage.png";
import { AuthContext } from "../../../AuthProvider";
import Google from "./google.png";
import { UserDataContext } from "../../../App";

const SignUpScreen = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  let userUID = getUserUID();
  let history = useHistory();
  if (userUID != "noUser") {
    console.log(userUID);
    history.push("/create");
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [signUpEmailTaken, setSignUpEmailTaken] = useState(false);

  const { register } = useContext(AuthContext);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
    
  }, []);

  let validator = require('email-validator');

  const validateSignup = () => {
    let validSubmission = true;
    if (name != '') {
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
      register(email, password, name, signupFailedFunction);
    }
  };

  const signupFailedFunction = (errorNum) => {
    setSignUpEmailTaken(false);
    setSignUpFailed(false);
    if (errorNum === 1) {
      setSignUpEmailTaken(true);
    } else {
      setSignUpFailed(true);
    }
  };

  return (
    <div className="signUpContainer">
      <div className="signUpFormContainer">
        <h1 className="signUpFormHeader">Sign Up</h1>
        <p className="signUpHeadlineHeader">
          Market and Monetize your Name, Image, and Likeness{" "}
          <span className="signUpHeadlineHeaderLastWord">Here</span>.
        </p>
        {signUpFailed && (
          <div className="signUpFailedAlert">
            <p>Sign-up failed. Please try again</p>
          </div>
        )}
        {signUpEmailTaken && (
          <div className="signUpFailedAlert">
            <p>This email address is already in use. Please use another email</p>
          </div>
        )}
        <form>
          <div className="signUpInputForms">
            <p className="signUpTextInputHeader" style={{ marginTop: "8%" }}>
              Name
            </p>
            <input
              className="signUpTextInput"
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(text) => {
                setName(text.target.value);
                setInvalidName(false);
              }}
            />
            {invalidName && (
              <h1 className="signUpInvalidText">Name is required</h1>
            )}
            <p className="signUpTextInputHeader">Email</p>
            <input
              className="signUpTextInput"
              type="text"
              id="Email"
              value={email}
              onChange={(text) => {
                setEmail(text.target.value);
                setInvalidEmail(false);
              }}
            />
            {invalidEmail && (
              <h1 className="signUpInvalidText">Invalid Email</h1>
            )}
            <p className="signUpTextInputHeader">Password</p>
            <input
              className="signUpTextInput"
              required
              type="password"
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <hr style={{ marginTop: 20, width: "45%" }} />
            <p style={{ fontSize: 14, marginTop: 20 }}>or</p>
            <hr style={{ marginTop: 20, width: "45%" }} />
          </div>
          <div className="googleSignUpContainer">
            <img className="googleImageSignUp" src={Google} />
            <p className="googleTextSignUp">Sign Up with Google</p>
          </div>
          <p className="signUpHaveAccountText">
            Already have an account?{" "}
            <Link className="signUpHaveAccountTextSpan" to={"/auth/sign-in"}>
              <span>Sign in</span>
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
