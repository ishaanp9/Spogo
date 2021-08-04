import React, { useEffect } from 'react';
import './SignUpScreen.css';
import WebFont from 'webfontloader';
import SignUpImage from '../../assets/signUpImage.png';

function SignUpScreen() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);

  return (
    <div className="signUpContainer">
      <div className="signUpDesign1" />
      <div className="signUpDesign2" />
      <div className="signUpFormContainer">
        <h1 className="signUpFormHeader">Sign Up</h1>
        <p className="signUpHeadlineHeader">
          Market and Monetize your Name, Image, and Likeness{' '}
          <span className="signUpHeadlineHeaderLastWord">Here</span>.
        </p>
        <form>
          <div className="signUpInputForms">
            <p className="signUpTextInputHeader" style={{ marginTop: '8%' }}>
              Name
            </p>
            <input className="signUpTextInput" required type="text" id="name" />
            <p className="signUpTextInputHeader">Email</p>
            <input
              className="signUpTextInput"
              required
              type="text"
              id="Email"
            />
            <p className="signUpTextInputHeader">Password</p>
            <input
              className="signUpTextInput"
              required
              type="text"
              id="Password"
            />
          </div>
          <button className="signUpCreateAccountButton">Create Account</button>
          <p className="signUpHaveAccountText">
            Already have an account?{' '}
            <span className="signUpHaveAccountTextSpan">Sign in</span>
          </p>
        </form>
      </div>
      <div className="signUpImageContainer">
        <img className="signUpImage" src={SignUpImage} />
      </div>
    </div>
  );
}

export default SignUpScreen;
