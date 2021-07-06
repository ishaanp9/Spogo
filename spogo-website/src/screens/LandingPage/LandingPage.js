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
            <img
              src="https://ally.io/wp-content/uploads/6023f832c71560e7cd9e4265_Ally.io-Business-Operations-Software-p-2000.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
