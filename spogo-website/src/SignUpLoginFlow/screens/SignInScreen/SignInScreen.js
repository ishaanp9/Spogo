import React, {useEffect} from 'react';
import './SignInScreen.css';
import WebFont from 'webfontloader';
import SignInImage from '../../assets/signUpImage.png';


function SignInScreen() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);

  return (
    <div>
      <div className="signInContainer">
        <div className="signInDesign1" />
        <div className="signInDesign2" />
        <div className="signInFormContainer">
          <h1 className="signInFormHeader">Sign In</h1>
          <p className="signInHeadlineHeader">
            Market and Monetize your Name, Image, and Likeness {' '}
            <span className="signInHeadlineHeaderLastWord">Here</span>.
          </p>
          <form>
            <div className="signInInputForms">
              <p className="signInTextInputHeader" style={{ marginTop: '8%' }}>Email</p>
              <input
                className="signInTextInput"
                required
                type="text"
                id="Email"
              />
              <p className="signInTextInputHeader">Password</p>
              <input
                className="signInTextInput"
                required
                type="text"
                id="Password"
              />
            </div>
            <p className='signInForgotPassword'>Forgot Password?</p>
            <button className="signInCreateAccountButton">
              Sign in
            </button>
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
}

export default SignInScreen;
