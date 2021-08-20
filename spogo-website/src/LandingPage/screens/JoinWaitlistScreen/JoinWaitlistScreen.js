import React from "react";
import "./JoinWaitlistScreen.css";

const JoinWaitlistScreen = () => {
  return (
    <div>
      <div className="joinWaitlistScreenContainer">
        <div className="joinWaitlistContainer">
          <div className="waitlistFormContainer">
            <h1 className="waitlistFormHeader">Join Waitlist</h1>
            <p className="waitlistHeadlineHeader">
              Receive updates about new features and our marketplace.
            </p>
            <form>
              <div className="waitlistInputForms">
                <p
                  className="waitlistTextInputHeader"
                  style={{ marginTop: "8%" }}
                >
                  Name
                </p>
                <input
                  className="waitlistTextInput"
                  required
                  type="name"
                //   value={email}
                //   onChange={(text) => {
                //     setEmail(text.target.value);
                //     setInvalidEmail(false);
                //   }}
                />
                {/* {invalidEmail && ( */}
                  {/* <h1 className="waitlistInvalidText">Invalid Email</h1> */}
                {/* )} */}
                <p className="waitlistTextInputHeader">Email</p>
                <input
                  className="waitlistTextInput"
                  required
                  autoCapitalize="none"
                  id="email"
                  type="email"
                //   value={password}
                //   onChange={(text) => setPassword(text.target.value)}
                />
              </div>
              <button
                className="joinWaitlistButton"
                type="button"
                style={{marginTop: 15}}
                // onClick={() => {
                //   validateLogin();
                // }}
              >
                Join Waitlist
              </button>

              {/* <div
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
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinWaitlistScreen;
