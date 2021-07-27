import React, { useEffect, useState } from "react";
import Item from "../../components/ExpTrophyMesItem/Item";
import { VideoItem, ImageItem } from "../../components/VideoItem/VideoItem";
import "./Profile.css";
import firebase from "../../../firebase";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdMail, MdStar, MdLocationOn } from "react-icons/md";
import { BsLink45Deg } from 'react-icons/bs';
import BlankProfile from "./blank_profile.png";
import SpogoLogo from "./spogo_logo.png";
import Modal from "react-modal";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

import {
  addUserInfo,
  setUserDict,
  setExperienceArray,
  setTrophyArray,
  setMeasurableArray,
  setMediaArray,
  getUserInfo,
  setExperienceID,
  setTrophyID,
  setMeasurableID,
  setVideoImageID,
  getExperienceArray,
  getTrophyArray,
  getMeasurableArray,
  getUserDict,
  getMediaArray,
  setUserDataCollected,
  getUserDataCollected,
} from "../../../ProfileData";

const Profile = (props) => {
  let path = props.url;
  let UID = path.substring(path.lastIndexOf("/") + 1);
  const [thisUserInfoDict, setThisUserInfoDict] = useState({});
  const [thisTrophyArray, setThisTrophyArray] = useState([]);
  const [thisExperienceArray, setThisExperienceArray] = useState([]);
  const [thisMeasurableArray, setThisMeasurableArray] = useState([]);
  const [thisMediaArray, setThisMediaArray] = useState([]);
  const [userExists, setUserExists] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [wildcard, setWildcard] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [showInstagram, setShowInstagram] = useState(true);
  const [showTwitter, setShowTwitter] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showWildcard, setShowWildcard] = useState(true);

  useEffect(async () => {
    //Checks if user data has already been retrieved from the database, other retreives data
    if (getUserDataCollected()) {
      setThisUserInfoDict(getUserDict());
      setThisTrophyArray(getTrophyArray());
      setThisExperienceArray(getExperienceArray());
      setThisMeasurableArray(getMeasurableArray());
      setThisMediaArray(getMediaArray());
      setUserInfo();
      displayProfileImage();
      setSocialIcons();
      determineIconSize();
    } else {
      await getDBUserInfo();
    }
  }, []);

  const getDBUserInfo = async () => {
    try {
      //Gets user info from database based on UID in the URL
      let dbPath = firebase
        .firestore()
        .collection("Users")
        .doc(UID)
        .collection("User Info");
      let profileData = dbPath.doc("Profile Data");
      await profileData
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserDict(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("User Info doc not found!");
            setUserExists(false);
          }
        })
        .catch((error) => {
          console.log("Error getting user info document:", error);
        });
      let experienceArray = dbPath.doc("Experience Array");
      await experienceArray
        .get()
        .then((doc) => {
          if (doc.exists) {
            setExperienceArray(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("Exp Array doc not found!");
          }
        })
        .catch((error) => {
          console.log("Error getting exp array document:", error);
        });
      let trophyArray = dbPath.doc("Trophy Array");
      await trophyArray
        .get()
        .then((doc) => {
          if (doc.exists) {
            setTrophyArray(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("Trophy Array doc not found!");
          }
        })
        .catch((error) => {
          console.log("Error getting trophy array document:", error);
        });
      let measurableArray = dbPath.doc("Measurable Array");
      await measurableArray
        .get()
        .then((doc) => {
          if (doc.exists) {
            setMeasurableArray(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("Measurable Array doc not found!");
          }
        })
        .catch((error) => {
          console.log("Error getting measurable array document:", error);
        });
      let mediaArray = dbPath.doc("Media Array");
      await mediaArray
        .get()
        .then((doc) => {
          if (doc.exists) {
            setMediaArray(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("Media Array doc not found!");
          }
        })
        .catch((error) => {
          console.log("Error getting media array document:", error);
        });
    } catch (e) {
      console.log(e);
      setUserExists(false);
    }
    //Sets all the user info for the profile screen based on Profile Data
    setThisUserInfoDict(getUserDict());
    setThisTrophyArray(getTrophyArray());
    setThisExperienceArray(getExperienceArray());
    setThisMeasurableArray(getMeasurableArray());
    setThisMediaArray(getMediaArray());
    setUserInfo();
    displayProfileImage();
    setSocialIcons();
    determineIconSize();
    setUserDataCollected();
  };

  //Gets and displays the profile image from firebase storage and firestore
  async function displayProfileImage() {
    try {
      const profileImageUri = await firebase
        .storage()
        .ref(getUserInfo("profile-image"));
      const url = await profileImageUri.getDownloadURL();
      setProfileImage(url);
    } catch (e) {
      console.log(e);
    }
  }

  //Sets the user profile info from Profile Data
  function setUserInfo() {
    setEmail(getUserInfo("preferred-email"));
    console.log(email);
    setName(getUserInfo("name"));
    setSport(getUserInfo("sport"));
    setPosition(getUserInfo("position"));
    setLocation(getUserInfo("location"));
    setInstagram(getUserInfo("instagram-handle"));
    setTwitter(getUserInfo("twitter-handle"));
    setWildcard(getUserInfo("wildcard"));
    setBio(getUserInfo("bio"));
  }

  //Determines which social icosn the profile screen should show based on wether the user has entered the social link
  function setSocialIcons() {
    if (
      getUserInfo("preferred-email") === "" ||
      getUserInfo("preferred-email") === null ||
      getUserInfo("preferred-email") === undefined
    ) {
      setShowEmail(false);
    }
    if (
      getUserInfo("instagram-handle") === "" ||
      getUserInfo("instagram-handle") === null ||
      getUserInfo("instagram-handle") === undefined
    ) {
      setShowInstagram(false);
    }
    if (
      getUserInfo("twitter-handle") === "" ||
      getUserInfo("twitter-handle") === null ||
      getUserInfo("twitter-handle") === undefined
    ) {
      setShowTwitter(false);
    }
    if (
      getUserInfo("wildcard") === "" ||
      getUserInfo("wildcard") === null ||
      getUserInfo("wildcard") === undefined
    ) {
      setShowWildcard(false);
    }
  }

  const [iconSize, setIconSize] = useState(25);

  //Determines the size to display the icons based on screen width
  const determineIconSize = () => {
    if (window.innerWidth < 600) {
      setIconSize(25);
    } else if (window.innerWidth < 1200) {
      setIconSize(40);
    } else {
      setIconSize(25);
    }
  };

  const [showMore, setShowMore] = useState(false);
  //See more see less for the bio
  const getBioSeeMoreSeeLess = (text) => {
    if (text.length <= 151) {
      return text;
    }
    if (text.length > 151 && showMore) {
      return (
        <div className="seeLessBio">
          <p>{text}</p>
          <button className="seeLessButton" onClick={() => setShowMore(false)}>
            See Less
          </button>
        </div>
      );
    }
    if (text.length > 151) {
      return (
        <div className="seeMoreBio">
          <p>
            {text.slice(0, 151)}
            <span className="seeMoreButton" onClick={() => setShowMore(true)}>
              {" "}
              ...See More
            </span>
          </p>
          {/* <button
            className='seeMoreLessButton'
            onClick={() => setShowMore(true)}>
            See More
          </button> */}
        </div>
      );
    }
  };

  const [wildcardLinkModalOpen, setWildcardLinkModalOpen] = useState(false);

  return userExists ? (
    <div className="ProfileScreenContainer">
      <Modal
        isOpen={wildcardLinkModalOpen}
        onRequestClose={() => setWildcardLinkModalOpen(false)}
        className="wildcardLinkModalContainer"
      >
        <div className="wildcardLinkModalContentContainer">
          <h1>External Link Warning</h1>
          <p>
            This link goes to: {wildcard}. Are you sure you want to continue?
          </p>
          <div className="wildcardLinkModalButtonsContainer">
            <button
              className="wildcardLinkModalButton"
              onClick={() => setWildcardLinkModalOpen(false)}
            >
              No
            </button>
            <button className="wildcardLinkModalButton" onClick={() => {window.open(wildcard); setWildcardLinkModalOpen(false)}}>
              {/* <Link
                to={{ pathname: wildcard }}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              > */}
                Yup
              {/* </Link> */}
            </button>
          </div>
        </div>
      </Modal>
      {window.innerWidth > 1200 && (
        <div className="profileScrollBarContainer">
          <p>ScrollBar Goes Here</p>
        </div>
      )}
      <div className="middleProfileContent">
        {window.innerWidth > 1200 ? (
          <>
            <div className="profileHeader">
              <div className="profileTopContainer">
                <div className="profileImageContainer">
                  {profileImage === "" || profileImage === undefined ? (
                    <img className="profileImage" src={BlankProfile} />
                  ) : (
                    <img className="profileImage" src={profileImage} />
                  )}
                </div>
                <div className="profileTextContainer">
                  <div className="nameSportTextContainer">
                    <h1>{name}</h1>
                    <p className="nameSportDivider"> | </p>
                    <h2>
                      {position === "" ? sport : sport + " - " + position}
                    </h2>
                  </div>
                  <div className="locationIconTextContainer">
                    <MdLocationOn color={"#E1306C"} />
                    <h3>{location}</h3>
                  </div>
                  <div
                    className="socialIconsRow"
                    style={{
                      paddingTop: window.innerWidth / 80,
                      paddingBottom: window.innerWidth / 80,
                    }}
                  >
                    {showInstagram && (
                      <FaInstagram
                        className="socialIcon"
                        onClick={() =>
                          // window.location.replace("www.instagram.com/" + instagram)
                          window.open("https://instagram.com/" + instagram)
                        }
                        size={iconSize}
                        color={"#E1306C"}
                      />
                    )}
                    {showTwitter && (
                      <FaTwitter
                        className="socialIcon"
                        onClick={() =>
                          // window.location.replace("www.instagram.com/" + instagram)
                          window.open("https://twitter.com/" + twitter)
                        }
                        size={iconSize}
                        color={"#1DA1F2"}
                      />
                    )}
                    {showEmail && (
                      <MdMail
                        className="socialIcon"
                        onClick={() => window.open("mailto:" + email)}
                        // onClick={() =>
                        //   // window.location.replace("www.instagram.com/" + instagram)
                        //   window.open("https://instagram.com/" + instagram)
                        // }
                        size={iconSize}
                        color={"#5D4D4A"}
                      />
                    )}
                    {showWildcard && (
                      <BsLink45Deg
                        className="socialIcon"
                        onClick={() => setWildcardLinkModalOpen(true)}
                        size={iconSize}
                        color={"#ffae42"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {bio === "This is an empty bio. Edit it as you see fit." ? (
              <div>
                <p></p>
              </div>
            ) : (
              <>
                <div
                  className="bioContainer"
                  style={{
                    marginTop: window.innerHeight / 80,
                    marginBottom: window.innerHeight / 80,
                  }}
                >
                  <h1>Bio</h1>
                  <hr
                    className="componentHeaderDivider"
                    color="lightgrey"
                    size="1"
                  />
                  <p>{getBioSeeMoreSeeLess(bio)}</p>
                </div>
                <hr size="2" color="black" className="bioDivider" />
              </>
            )}
          </>
        ) : (
          <>
            <div className="profileHeader">
              {profileImage === "" || profileImage === undefined ? (
                <img className="profileImage" src={BlankProfile} />
              ) : (
                <img className="profileImage" src={profileImage} />
              )}
              <div className="nameSportTextContainer">
                <h1>{name}</h1>
                <h2>{position === "" ? sport : sport + " - " + position}</h2>
              </div>

              <h3>{location}</h3>
              <div
                className="socialIconsRow"
                style={{
                  paddingTop: window.innerWidth / 80,
                  paddingBottom: window.innerWidth / 80,
                }}
              >
                {showInstagram && (
                  <FaInstagram
                    className="socialIcon"
                    onClick={() =>
                      // window.location.replace("www.instagram.com/" + instagram)
                      window.open("https://instagram.com/" + instagram)
                    }
                    size={iconSize}
                    color={"#E1306C"}
                  />
                )}
                {showTwitter && (
                  <FaTwitter
                    className="socialIcon"
                    onClick={() =>
                      // window.location.replace("www.instagram.com/" + instagram)
                      window.open("https://twitter.com/" + twitter)
                    }
                    size={iconSize}
                    color={"#1DA1F2"}
                  />
                )}
                {showEmail && (
                  <MdMail
                    className="socialIcon"
                    onClick={() => window.open("mailto:" + email)}
                    // onClick={() =>
                    //   // window.location.replace("www.instagram.com/" + instagram)
                    //   window.open("https://instagram.com/" + instagram)
                    // }
                    size={iconSize}
                    color={"#5D4D4A"}
                  />
                )}
                {showWildcard && (
                  <BsLink45Deg
                    className="socialIcon"
                    onClick={() => setWildcardLinkModalOpen(true)}
                    size={iconSize}
                    color={"#ffae42"}
                  />
                )}
              </div>
            </div>
            {bio === "This is an empty bio. Edit it as you see fit." ? (
              <div>
                <p></p>
              </div>
            ) : (
              <div>
                <div
                  className="bioContainer"
                  style={{
                    marginTop: window.innerHeight / 80,
                    marginBottom: window.innerHeight / 80,
                  }}
                >
                  <p>{getBioSeeMoreSeeLess(bio)}</p>
                </div>
                <hr size="2" color="black" className="bioDivider" />
              </div>
            )}
          </>
        )}
        {thisMediaArray.length === 0 ? null : (
          <div className="profileItemListContainer">
            <h1 className="profileItemListHeader">Highlights</h1>
            <ul
              className="videoItemArrayList"
              style={{ width: window.innerWidth }}
            >
              {thisMediaArray.map((item) => {
                if (item.media === "photo") {
                  return <ImageItem url={item.url} />;
                } else {
                  return <VideoItem url={item.url} />;
                }
              })}
            </ul>
          </div>
        )}
        {thisExperienceArray.length === 0 ? null : (
          <div className="profileItemListContainer">
            <h1 className="profileItemListHeader">Experiences</h1>
            <hr className="componentHeaderDivider" size="1" color="lightgrey" />
            <ul>
              {thisExperienceArray.map((item) => (
                <Item
                  iconName="crown"
                  color="#ffbb48"
                  title={item.title}
                  time={item.duration}
                  idNum={item.idNum}
                  userUID={UID}
                />
              ))}
            </ul>
          </div>
        )}
        {thisTrophyArray.length === 0 ? null : (
          <div className="profileItemListContainer">
            <h1 className="profileItemListHeader">Accomplishments</h1>
            <hr className="componentHeaderDivider" size="1" color="lightgrey" />
            <ul>
              {thisTrophyArray.map((item) => (
                <Item
                  iconName="trophy"
                  color="#A08864"
                  title={item.title}
                  time={item.duration}
                  idNum={item.idNum}
                  userUID={UID}
                />
              ))}
            </ul>
          </div>
        )}
        {thisMeasurableArray.length === 0 ? null : (
          <div className="profileItemListContainer">
            <h1 className="profileItemListHeader">Measurables</h1>
            <hr className="componentHeaderDivider" size="1" color="lightgrey" />
            <ul>
              {thisMeasurableArray.map((item) => (
                <Item
                  iconName="rocket-launch"
                  color="dodgerblue"
                  title={item.title}
                  time={item.value}
                  idNum={item.idNum}
                  userUID={UID}
                />
              ))}
            </ul>
          </div>
        )}
        <div className="spogoLogo">
          <img
            src={SpogoLogo}
            alt="Spogo"
            onClick={() => window.open("https://spogo.us")}
          />
        </div>
      </div>
      {window.innerWidth > 1200 && (
        <div className="profileChatRightTab">Chat Goes Here</div>
      )}
    </div>
  ) : (
    <div>
      <h1>User Doesn't Exist</h1>
    </div>
  );
};

export default Profile;
