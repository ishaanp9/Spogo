import React from 'react';
import './LandingPage.css';
import Header from '../../components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainImage from './main_image.png';
import ExampleImage from './top.PNG';
import SpogoBottom from './bottom.png';

import React, { useState } from "react";
import "./LandingPage.css";
import Header from "../../components/Header/Header";
import firebase from "../../firebase";

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [waitlistInputValid, setWaitlistInputValid] = useState(false);

  async function addUserToWaitlist() {
      await firebase
      .firestore()
      .collection("Waitlist")
      .add({
        name: name,
        email: email,
      })
      .then(() => {
        console.log("Worked");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  let handleOnChangeEmail = ( email ) => {
    setEmail(email.target.value)
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email) ) {
      setWaitlistInputValid(true)
    }
    else {
      setWaitlistInputValid(false)    
    }
}

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" />
      </Switch>
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
                <input
                  maxLength={100}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={text => 
                    setName(text.target.value)
                  }
                />
                <input
                  maxLength={100}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleOnChangeEmail}
                  required={true}
                />
              </div>
              <div className="form_button">
                {/* <button onClick={() => waitlistInputValid ? addUserToWaitlist() : null}>
                  Join the Waitlist
                </button> */}
                <input className="form_button" type="submit" value="Join the Waitlist" onSubmit={() => waitlistInputValid ? addUserToWaitlist() : null}/>
              </div>
            </form>
          </div>

          <div className="image">
            <img src={ExampleImage} alt="" />
          </div>
        </div>
        <div className="product_show_header">
          <h1>This is Spogo.</h1>
          <p className="landing_subtitle">
            Spogo is the only platform Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </p>
          <img
            className="big_image"
            src="https://ally.io/wp-content/uploads/6023f832c71560e7cd9e4265_Ally.io-Business-Operations-Software-p-2000.png"
            alt="data"
          />
          {/* <img className='big_image'
            src="https://ally.io/wp-content/uploads/6023f832c71560e7cd9e4265_Ally.io-Business-Operations-Software-p-2000.png"
            alt="data"
          /> */}
          <div className="landing_products">
            <div className="left_text">
              <div className="left_side_text">
                <h1>Bio/Position/Socials</h1>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci
                </p>
              </div>
              <img src={ExampleImage} alt="" />
              
            </div>
            <div className="right_text">
              <img src={ExampleImage} alt="" />
              <div className="right_side_text">
                <h1>Bio/Position/Socials</h1>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci
                </p>
              </div>
             
            </div>
            <div className="left_text">
              <div className="left_side_text">
                <h1>Bio/Position/Socials</h1>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci
                </p>
              </div>
              <img src={ExampleImage} alt="" />
              
            </div>
            <div className="right_text">
              <img src={ExampleImage} alt="" />
              <div className="right_side_text">
                <h1>Bio/Position/Socials</h1>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci
                </p>
              </div>
              {/* Create Highlights */}
            </div>
            <div className="left_text">
              <div className="left_side_text">
                <h1>Bio/Position/Socials</h1>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci
                </p>
              </div>
              <img src={ExampleImage} alt="" />
              {/* Bio/Position/Socials */}
            </div>
          </div>
          <div className="bottom_part">
            <div className="no_copyright">
              <img
                className="spogo_bottom"
                src={SpogoBottom}
                alt="Spogo Logo"
              />
              <div className="content">
                <div className="header_column">
                  <h2>Legal</h2>
                  <p>Privacy Policy</p>
                  <p>Terms of Service</p>
                </div>
                <div className="header_column">
                  <h2>Contact</h2>
                  <p>getspogo@gmail.com</p>
                </div>
                <div className="header_column">
                  <h2>Pages</h2>
                  <p>Home</p>
                  <p>About</p>
                  <p>Blog</p>
                  <p>FAQ</p>
                </div>
              </div>
            </div>
            <div className="copyright">
              <p>© 2021 Spogo | All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default LandingPage;
