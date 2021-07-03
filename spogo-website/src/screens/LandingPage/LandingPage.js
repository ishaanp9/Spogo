import React from 'react';
import './LandingPage.css';
import Header from '../../components/Header/Header';

function LandingPage() {
  return (
    <div className="landing">
      <Header />
      <div className="web_body">
        <div className="top_banner">
          <div className="form_area">
            <div className="form_header">
              <h1 className="h1_text">
                The New Way To Showcase Yourself and Monetize Your Name, Image,
                And Likeness Is Here.
              </h1>
              <p className="p_text">Find out more.</p>
            </div>

            {/* Name */}
            {/* Email */}
            {/* Join Waitlist */}
            <form className="form">
              <div className="form_inputs">
                <input maxLength={100} type="text" placeholder="Full Name" />
                <input
                  maxLength={100}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="form_button">
                <button>Join the Waitlist</button>
              </div>
            </form>
          </div>

          <div className="image">
            <img
              src="https://ally.io/wp-content/uploads/6023f832c71560e7cd9e4265_Ally.io-Business-Operations-Software-p-2000.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
