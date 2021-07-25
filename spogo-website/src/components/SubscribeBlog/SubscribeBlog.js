import React, { useState } from "react";
import "./SubscribeBlog.css";
import firebase from "../../firebase";

const SubscribeBlog = () => {
  const [email, setEmail] = useState("");
  const [blogAddSucessful, setBlogAddSuccessful] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  let validator = require("email-validator");

  const validateBlogEmail = () => {
    if (validator.validate(email)) {
      addUserToBlogList();
      setBlogAddSuccessful(true);
    } else {
      setInvalidInput(true);
    }
  };

  const addUserToBlogList = async () => {
    await firebase
      .firestore()
      .collection("Blog")
      .add({
        email: email,
      })
      .then(() => {
        setEmail("");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div>
      {blogAddSucessful ? (
        <div className="subscribeSuccessTextContainer">
          <button type="button">Thank You!</button>
        </div>
      ) : (
        <form className="subscribeFormContainer" onsubmit="return false">
          <p className="subscribeText">Subscribe to our Blog!</p>
          <div className="subscribeForm">
            <div>
              <input
                className="subscribeInput"
                style={
                  invalidInput ? { borderWidth: 2, borderColor: "red" } : {}
                }
                maxLength={100}
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(text) => {
                  setEmail(text.target.value);
                  setInvalidInput(false);
                }}
              />
              {invalidInput && (
                <div className="invalidEmailContainer">
                  <p className="invalidEmailText">Invalid Email</p>
                </div>
              )}
            </div>
            <button
              type="button"
              className="subscribeButton"
              onClick={
                () => validateBlogEmail()
                // ? addUserToWaitlist() : null
              }
            >
              Subscribe now
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SubscribeBlog;
