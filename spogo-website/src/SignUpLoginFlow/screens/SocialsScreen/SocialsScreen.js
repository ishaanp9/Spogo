import React, { useEffect, useState, useContext } from "react";
import "./SocialsScreen.css";
import { useHistory } from "react-router-dom";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import WebFont from "webfontloader";
import { addUserInfo, getUserDict, getUserInfo} from "../../../UserData";
import firebase from '../../../firebase';
import { UserDataContext } from "../../../App";

const SocialsScreen = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  let userUID;
  let history = useHistory()
  const [instagramHandle, setInstagramHandle] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [preferredEmail, setPreferredEmail] = useState(getUserInfo('email'));
  const [wildcardLink, setWildcardLink] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidWildcard, setInvalidWildcard] = useState(false);

  useEffect(() => {
    userUID = getUserUID()
    WebFont.load({
      google: {
        families: ["Montserrat", "Open Sans", "Public Sans"],
      },
    });
    if (getUserInfo('sport') === null && getUserInfo('position') === null) {
      history.push("/auth/sign-up/location-sport-position");
    }
    console.log(getUserDict());
  }, []);

  let validator = require("email-validator");

  const handleSubmission = async () => {
    let validLinksSubmission = true;
    if (preferredEmail != '') {
      if (!validator.validate(preferredEmail)) {
        setInvalidEmail(true);
        validLinksSubmission = false;
      }
    }
    if (wildcardLink != "") {
      if (wildcardLink.substring(0, 8) != "https://") {
        validLinksSubmission = false;
        setInvalidWildcard(true)
      }
    }
    if (validLinksSubmission) {
      if (userUID === "noUser") {
        history.push('/auth')
      } else {
        addUserInfo("instagram-handle", instagramHandle.replace("@", ""));
        addUserInfo("twitter-handle", twitterHandle.replace("@", ""));
        if (preferredEmail === '') {
          addUserInfo("preferred-email", getUserInfo('email'));
  
        } else {
          addUserInfo("preferred-email", preferredEmail);
        }
        addUserInfo("wildcard", wildcardLink);
        addUserInfo("sign-up-finished", true)
        addUserInfo('bio', '')
        console.log(getUserDict())
        await addUserInfoDictToDB()
      }
    }
  };

  const addUserInfoDictToDB = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .collection("User Info")
      .doc("Profile Data")
      .set({
        userArray: getUserDict(),
      })
      .then(() => {
        history.push('/create')
        console.log("User added!");
      });
  };

  return (
    <div className="enterSocialsContainer">
      <div className="socialScreenContainer">
        <p className="socialScreenFormHeader">
          Enter your Social Media Handles
        </p>
        <p className="socialScreenHeadlineHeader">Some awsome tagline</p>
        <form>
          <div className="socialsTextInputContainer">
            <FaInstagram size={25} color={"#3eb489"} />
            <input
              className="socialScreenTextInput"
              placeholder="Enter Instagram Handle"
              type="text"
              id="Instagram"
              value={instagramHandle}
              onChange={(text) => {
                setInstagramHandle(text.target.value);
              }}
            />
          </div>
          <div className="socialsTextInputContainer">
            <FaTwitter size={25} color={"#3eb489"} />
            <input
              className="socialScreenTextInput"
              placeholder="Enter Twitter Handle"
              type="text"
              id="Twitter"
              value={twitterHandle}
              onChange={(text) => {
                setTwitterHandle(text.target.value);
              }}
            />
          </div>
          <div className="socialsTextInputContainer">
            <MdEmail size={25} color={"#3eb489"} />
            <input
              className="socialScreenTextInput"
              placeholder="Note: Email they sign up with will be here by defualt"
              type="text"
              id="Email"
              value={preferredEmail}
              onChange={(text) => {
                setPreferredEmail(text.target.value);
                setInvalidEmail(false)
              }}
            />
          </div>
          {invalidEmail && <h1 className="socialsInvalidText">Invalid email</h1>}
          <div className="socialsTextInputContainer">
            <BsLink45Deg size={25} color={"#3eb489"} />
            <input
              className="socialScreenTextInput"
              placeholder="Enter Link a of Your Choice"
              type="text"
              id="Link"
              value={wildcardLink}
              onChange={(text) => {
                setWildcardLink(text.target.value);
                setInvalidWildcard(false)
              }}
            />
          </div>
          {invalidWildcard && <h1 className="socialsInvalidText">Link must start with https://</h1>}
          {/* <Link to={"/create"} className="socialsScreenNextButton"> */}
          <button
            className="socialsScreenNextButton"
            type="button"
            onClick={() => handleSubmission()}
          >
            Next
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default SocialsScreen;
