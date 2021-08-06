import React, { useEffect } from 'react';
import './SignUpScreen.css';
import WebFont from 'webfontloader';
import SignUpImage from '../../assets/signUpImage.png';
import Google from './google.png';

const SignUpScreen = () => {
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
          <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
            <hr style={{ marginTop: 20, width: '45%' }} />
            <p style={{fontSize: 14, marginTop: 20}}>or</p>
            <hr style={{ marginTop: 20, width: '45%' }} />
          </div>
          <div className="googleSignUpContainer">
            <img className="googleImageSignUp" src={Google} />
            <p className="googleTextSignUp">Sign Up with Google</p>
          </div>
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
};

export default SignUpScreen;
