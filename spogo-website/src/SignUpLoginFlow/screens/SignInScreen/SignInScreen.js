import React, { useEffect, useContext, useState } from 'react';
import './SignInScreen.css';
import WebFont from 'webfontloader';
import SignInImage from '../../assets/signUpImage.png';
import { AuthContext } from '../../../AuthProvider';
import Google from '../SignUpScreen/google.png';

const SignInScreen = () => {
  const { login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);

  const loginFailedFunction = () => {
    setLoginFailed(true);
  };

  let validator = require('email-validator');

  const validateLogin = () => {
    let validLogin = true;
    console.log(email + ' ' + password);
    if (email != '' && password != '') {
      if (!validator.validate(email)) {
        validLogin = false;
        setInvalidEmail(true);
      }
      if (validLogin) {
        login(email, password, loginFailedFunction);
      }
    }
  };

  return (
    <div className="signInScreenContainer">
      <div className="signInContainer">
        <div className="signInDesign1" />
        <div className="signInDesign2" />
        <div className="signInFormContainer">
          <h1 className="signInFormHeader">Sign In</h1>
          <p className="signInHeadlineHeader">
            Market and Monetize your Name, Image, and Likeness{' '}
            <span className="signInHeadlineHeaderLastWord">Here</span>.
          </p>
          <form>
            {loginFailed && (
              <div className="invalidLoginAlert">
                <p>
                  The username and password you entered did not match our
                  records. Please double-check and try again.
                </p>
              </div>
            )}
            <div className="signInInputForms">
              <p className="signInTextInputHeader" style={{ marginTop: '8%' }}>
                Email
              </p>
              <input
                className="signInTextInput"
                required
                type="text"
                id="Email"
                value={email}
                onChange={(text) => {
                  setEmail(text.target.value);
                  setInvalidEmail(false);
                }}
              />
              {invalidEmail && <h1 className="invalidText">Invalid Email</h1>}
              <p className="signInTextInputHeader">Password</p>
              <input
                className="signInTextInput"
                required
                type="text"
                id="Password"
                value={password}
                onChange={(text) => setPassword(text.target.value)}
              />
            </div>
            <p className="signInForgotPassword">Forgot Password?</p>
            {/* <button className="signInCreateAccountButton" onClick={() => login('johnsmith21@gmail.com', 'password')}>
              Sign in
            </button> */}
            <button
              className="signInCreateAccountButton"
              type="button"
              onClick={() => {
                validateLogin();
              }}
            >
              Sign in
            </button>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <hr style={{ marginTop: 20, width: '45%' }} />
              <p style={{ fontSize: 14, marginTop: 20 }}>or</p>
              <hr style={{ marginTop: 20, width: '45%' }} />
            </div>
            <div className="googleSignInContainer">
              <img className="googleImageSignIn" src={Google} />
              <p className="googleTextSignIn">Sign In with Google</p>
            </div>
            <p className="signInHaveAccountText">
              Don't have an Account?{' '}
              <span className="signInHaveAccountTextSpan">Sign Up</span>
            </p>
          </form>
        </div>
        <div className="signInImageContainer">
          <img className="signInImage" src={SignInImage} />
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
