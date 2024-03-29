import React, { useEffect, useState, useRef } from "react";
import Item from "../../components/ExpTrophyMesItem/Item";
import { VideoItem, ImageItem } from "../../components/VideoItem/VideoItem";
import "./Profile.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdMail, MdStar, MdLocationOn, MdClose } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import BlankProfile from "./blank_profile.png";
import SpogoLogo from "../../../spogo_logo.png";
import Modal from "react-modal";
import { MixpanelConsumer } from "react-mixpanel";
import WebFont from "webfontloader";
import userErrorImage from "../../../SignUpLoginFlow/assets/signUpImage.png";
import loadingGIF from "../../../loading.gif";
import {
  addUserInfo,
  setUserDict,
  setExperienceArray,
  setMeasurableArray,
  setMediaArray,
  getUserInfo,
  getExperienceArray,
  getAccomplishmentArray,
  getMeasurableArray,
  getUserDict,
  getMediaArray,
  setUserDataCollected,
  getUserDataCollected,
  setAccomplishmentArray,
} from "../../../ProfileData";

const Profile = (props) => {
  let path = props.url;
  let UID = "";
  let usernameEntered = path.substring(path.lastIndexOf("/") + 1);
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

  const scrollBio = useRef(null);
  const scrollHighlights = useRef(null);
  const scrollExperience = useRef(null);
  const scrollAccomplishments = useRef(null);
  const scrollMeasurables = useRef(null);

  const [showLoadingModal, setShowLoadingModal] = useState(true);

  //there has to be a better way to do this, using a function didint work.
  const executeBioScroll = () =>
    scrollBio.current.scrollIntoView({ behavior: "smooth" });
  const executeHighlightsScroll = () =>
    scrollHighlights.current.scrollIntoView({ behavior: "smooth" });
  const executeExperiencesScroll = () =>
    scrollExperience.current.scrollIntoView({ behavior: "smooth" });
  const executeAccoplishmentsScroll = () =>
    scrollAccomplishments.current.scrollIntoView({ behavior: "smooth" });
  const executeMeasurablesScroll = () =>
    scrollMeasurables.current.scrollIntoView({ behavior: "smooth" });

  useEffect(async () => {
    //Checks if user data has already been retrieved from the database, other retreives data
    if (getUserDataCollected()) {
      setThisUserInfoDict(getUserDict());
      setThisTrophyArray(getAccomplishmentArray());
      setThisExperienceArray(getExperienceArray());
      setThisMeasurableArray(getMeasurableArray());
      setThisMediaArray(getMediaArray());
      setUserInfo();
      displayProfileImage();
      setSocialIcons();
      determineIconSize();
    } else {
      await getUsernameQuery();
      // await getDBUserInfo();
    }
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Open Sans"],
      },
    });
  }, []);

  //Based on the username, determines if UID tied to the username. If the username can't be found, instead sets userFound to false
  const getUsernameQuery = async () => {
    console.log(usernameEntered);
    await firebase
      .firestore()
      .collection("Users")
      .where("username", "==", usernameEntered)
      .get()
      .then(async (querySnapshot) => {
        if (querySnapshot.empty) {
          setUserExists(false);
        } else {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            UID = doc.id;
          });
        }
        await getDBUserInfo();
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

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
      let trophyArray = dbPath.doc("Accomplishment Array");
      await trophyArray
        .get()
        .then((doc) => {
          if (doc.exists) {
            setAccomplishmentArray(doc.data());
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
    setThisTrophyArray(getAccomplishmentArray());
    setThisExperienceArray(getExperienceArray());
    setThisMeasurableArray(getMeasurableArray());
    setThisMediaArray(getMediaArray());
    setUserInfo();
    displayProfileImage();
    setSocialIcons();
    determineIconSize();
    setUserDataCollected();
    setShowLoadingModal(false)
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
  const setUserInfo = () => {
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
  };

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
      setIconSize(22);
    } else if (window.innerWidth < 1200) {
      setIconSize(22);
    } else {
      setIconSize(22);
    }
  };

  const [showMore, setShowMore] = useState(false);
  //See more see less for the bio
  const getBioSeeMoreSeeLess = (text) => {
    if (text != null) {
      if (window.innerWidth < 600) {
        if (text.length <= 151) {
          return text;
        }
        if (text.length > 151 && showMore) {
          return (
            <div className="seeLessBio">
              <p>{text}</p>
              <button
                className="seeLessButton"
                onClick={() => setShowMore(false)}
              >
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
                <span
                  className="seeMoreButton"
                  onClick={() => setShowMore(true)}
                >
                  {" "}
                  ...See More
                </span>
              </p>
            </div>
          );
        }
      } else {
        if (text.length <= 500) {
          return text;
        }
        if (text.length > 500 && showMore) {
          return (
            <div className="seeLessBio">
              <p>{text}</p>
              <button
                className="seeLessButton"
                onClick={() => setShowMore(false)}
              >
                See Less
              </button>
            </div>
          );
        }
        if (text.length > 500) {
          return (
            <div className="seeMoreBio">
              <p>
                {text.slice(0, 500)}
                <span
                  className="seeMoreButton"
                  onClick={() => setShowMore(true)}
                >
                  {" "}
                  ...See More
                </span>
              </p>
            </div>
          );
        }
      }
    }
  };

  const [
    showMoreShowLessButtonExperience,
    setshowMoreShowLessButtonExperience,
  ] = useState(false);
  const [
    showMoreShowLessButtonAccoplishment,
    setshowMoreShowLessButtonAccoplishment,
  ] = useState(false);
  const [
    showMoreShowLessButtonMeasurables,
    setshowMoreShowLessButtonMeasurables,
  ] = useState(false);
  const [
    showMoreShowLessButtonTextExperience,
    setShowMoreShowLessButtonTextExperience,
  ] = useState("Show More");
  const [
    showMoreShowLessButtonTextAccomplishment,
    setShowMoreShowLessButtonTextAccomplishment,
  ] = useState("Show More");
  const [
    showMoreShowLessButtonTextMeasurables,
    setShowMoreShowLessButtonTextMeasurables,
  ] = useState("Show More");

  let itemLengthDifferenceNumberExperience;
  let itemLengthDifferenceNumberAccoplishment;
  let itemLengthDifferenceNumberMeasurables;

  const ShowMoreShowLess = (itemType) => {
    if (itemType === "Experience") {
      if (thisExperienceArray.length > 3 && !showMoreShowLessButtonExperience) {
        itemLengthDifferenceNumberExperience = thisExperienceArray.length - 3;
        // setLineShowShow(false);
        setShowMoreShowLessButtonTextExperience("Show More");
        return (
          <ul>
            {thisExperienceArray
              .slice(
                0,
                thisExperienceArray.length -
                  itemLengthDifferenceNumberExperience
              )
              .map((item) => (
                <Item
                  iconName="crown"
                  color="#ffbb48"
                  title={item.title}
                  team={item.team}
                  time={item.duration}
                  description={item.description}
                  idNum={item.idNum - itemLengthDifferenceNumberExperience}
                  userUID={UID}
                />
              ))}
          </ul>
        );
      } else {
        setShowMoreShowLessButtonTextExperience("Show Less");
        // setLineShowShow(true);
        return (
          <ul>
            {thisExperienceArray.map((item) => (
              <Item
                iconName="crown"
                color="#ffbb48"
                title={item.title}
                team={item.team}
                time={item.duration}
                description={item.description}
                idNum={item.idNum}
                userUID={UID}
              />
            ))}
          </ul>
        );
      }
    } else if (itemType === "Accoplishment") {
      if (thisTrophyArray.length > 3 && !showMoreShowLessButtonAccoplishment) {
        itemLengthDifferenceNumberAccoplishment = thisTrophyArray.length - 3;
        setShowMoreShowLessButtonTextAccomplishment("Show More");
        return (
          <ul>
            {thisTrophyArray
              .slice(
                0,
                thisTrophyArray.length - itemLengthDifferenceNumberAccoplishment
              )
              .map((item) => (
                <Item
                  iconName="trophy"
                  color="#A08864"
                  title={item.title}
                  time={item.duration}
                  description={item.description}
                  idNum={item.idNum - itemLengthDifferenceNumberAccoplishment}
                  userUID={UID}
                />
              ))}
          </ul>
        );
      } else {
        setShowMoreShowLessButtonTextAccomplishment("Show Less");
        return (
          <ul>
            {thisTrophyArray.map((item) => (
              <Item
                iconName="trophy"
                color="#A08864"
                title={item.title}
                time={item.duration}
                description={item.description}
                idNum={item.idNum}
                userUID={UID}
              />
            ))}
          </ul>
        );
      }
    } else if (itemType === "Measurables") {
      if (
        thisMeasurableArray.length > 3 &&
        !showMoreShowLessButtonMeasurables
      ) {
        itemLengthDifferenceNumberMeasurables = thisMeasurableArray.length - 3;
        setShowMoreShowLessButtonTextMeasurables("Show More");
        return (
          <ul>
            {thisMeasurableArray
              .slice(
                0,
                thisMeasurableArray.length -
                  itemLengthDifferenceNumberMeasurables
              )
              .map((item) => (
                <Item
                  iconName="rocket-launch"
                  color="dodgerblue"
                  title={item.title}
                  time={item.value}
                  idNum={item.idNum - itemLengthDifferenceNumberMeasurables}
                  userUID={UID}
                />
              ))}
          </ul>
        );
      } else {
        setShowMoreShowLessButtonTextMeasurables("Show Less");
        return (
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
        );
      }
    }
  };

  const [wildcardLinkModalOpen, setWildcardLinkModalOpen] = useState(false);

  return userExists ? (
    <MixpanelConsumer>
      {(mixpanel) => (
        <div className="ProfileScreenContainer">
          <Modal
            isOpen={wildcardLinkModalOpen}
            onRequestClose={() => setWildcardLinkModalOpen(false)}
            className="wildcardLinkModalContainer"
            overlayClassName="wildcardModalOverlay"
          >
            <div className="wildcardLinkModalContentContainer">
              <h1>External Link Warning</h1>
              <p>
                This link goes to: {wildcard}. Are you sure you want to
                continue?
              </p>
              <div className="wildcardLinkModalButtonsContainer">
                <button
                  className="wildcardLinkModalButton"
                  onClick={() => setWildcardLinkModalOpen(false)}
                >
                  No
                </button>
                <button
                  className="wildcardLinkModalButton"
                  onClick={() => {
                    window.open(wildcard);
                    setWildcardLinkModalOpen(false);
                    mixpanel.track(
                      "Profile Icons Pressed by External Visitor",
                      { "Profile Icon": "Wildcard" }
                    );
                  }}
                >
                  Yup
                </button>
              </div>
            </div>
          </Modal>

          {/* Loading Modal */}
          <Modal
            appElement={document.getElementById("root") || undefined}
            isOpen={showLoadingModal}
            className="loadingModal"
            overlayClassName="itemAddModalOverlay"
          >
            <div
              style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img src={loadingGIF} />
            </div>
          </Modal>
          {/* Loading Modal */}

          {window.innerWidth > 1200 && (
            // We should use refs so we can scroll to the ref clicked on
            <div className="profileScrollBarContainer">
              {bio != "This is an empty bio. Edit it as you see fit." ? (
                <p className="profileSideBarItem" onClick={executeBioScroll}>
                  Bio
                </p>
              ) : null}
              {thisMediaArray.length > 0 ? (
                <p
                  className="profileSideBarItem"
                  onClick={executeHighlightsScroll}
                >
                  Highlights
                </p>
              ) : null}
              {thisExperienceArray.length > 0 ? (
                <p
                  className="profileSideBarItem"
                  onClick={executeExperiencesScroll}
                >
                  Experiences
                </p>
              ) : null}
              {thisTrophyArray.length > 0 ? (
                <p
                  className="profileSideBarItem"
                  onClick={executeAccoplishmentsScroll}
                >
                  Accomplishments
                </p>
              ) : null}
              {thisMeasurableArray.length > 0 ? (
                <p
                  className="profileSideBarItem"
                  onClick={executeMeasurablesScroll}
                >
                  Measurables
                </p>
              ) : null}
            </div>
          )}
          <div className="middleProfileContent">
            {window.innerWidth > 600 ? (
              <>
                <div className="profileHeader">
                  <div className="profileImageContainer">
                    {profileImage === "" || profileImage === undefined ? (
                      <img className="profileImage" src={BlankProfile} />
                    ) : (
                      <img className="profileImage" src={profileImage} />
                    )}
                  </div>
                  <div className="profileTextContainer">
                    <div className="nameSportTextContainer">
                      <h1 className="websiteUserName">{name}</h1>
                      <h2 className="websiteSportPositionText">
                        {position === "" ? sport : sport + " - " + position}
                      </h2>
                    </div>

                    {location ? (
                      <div className="locationIconTextContainer">
                        <MdLocationOn color={"#EA4335"} size={20} />
                        <h3 className="locationText">{location}</h3>
                      </div>
                    ) : null}

                    <div className="socialIconsRow">
                      {showInstagram && (
                        <FaInstagram
                          className="socialIcon"
                          onClick={() =>
                            // window.location.replace("www.instagram.com/" + instagram)
                            {
                              mixpanel.track(
                                "Profile Icons Pressed by External Visitor",
                                { "Profile Icon": "Instagram" }
                              );
                              window.open("https://instagram.com/" + instagram);
                            }
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
                            {
                              mixpanel.track(
                                "Profile Icons Pressed by External Visitor",
                                { "Profile Icon": "Twitter" }
                              );
                              window.open("https://twitter.com/" + twitter);
                            }
                          }
                          size={iconSize}
                          color={"#1DA1F2"}
                        />
                      )}
                      {showEmail && (
                        <MdMail
                          className="socialIcon"
                          onClick={() => {
                            mixpanel.track(
                              "Profile Icons Pressed by External Visitor",
                              { "Profile Icon": "Email" }
                            );
                            window.open("mailto:" + email);
                          }}
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
                {bio === "This is an empty bio. Edit it as you see fit." ? (
                  <div>
                    <p></p>
                  </div>
                ) : (
                  <div ref={scrollBio} className="bioContainer">
                    <h1>Bio</h1>
                    <hr
                      className="componentHeaderDivider"
                      color="lightgrey"
                      size="1"
                    />
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {getBioSeeMoreSeeLess(bio)}
                    </p>
                  </div>
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
                    <h2>
                      {position === "" ? sport : sport + " - " + position}
                    </h2>
                  </div>

                  {location ? (
                    <div className="locationIconTextContainer">
                      <MdLocationOn color={"#EA4335"} size={20} />
                      <h3 className="locationText">{location}</h3>
                    </div>
                  ) : null}
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
                          {
                            mixpanel.track(
                              "Profile Icons Pressed by External Visitor",
                              { "Profile Icon": "Instagram" }
                            );
                            window.open("https://instagram.com/" + instagram);
                          }
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
                          {
                            mixpanel.track(
                              "Profile Icons Pressed by External Visitor",
                              { "Profile Icon": "Twitter" }
                            );
                            window.open("https://twitter.com/" + twitter);
                          }
                        }
                        size={iconSize}
                        color={"#1DA1F2"}
                      />
                    )}
                    {showEmail && (
                      <MdMail
                        className="socialIcon"
                        onClick={() => {
                          mixpanel.track(
                            "Profile Icons Pressed by External Visitor",
                            { "Profile Icon": "Email" }
                          );
                          window.open("mailto:" + email);
                        }}
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
                  <div className="bioContainer">
                    <h1>Bio</h1>
                    <hr
                      className="componentHeaderDivider"
                      color="lightgrey"
                      size="1"
                    />
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {getBioSeeMoreSeeLess(bio)}
                    </p>
                  </div>
                )}
              </>
            )}
            {thisMediaArray.length === 0 ? null : (
              <div ref={scrollHighlights} className="profileItemListContainer">
                <h1 className="profileItemListHeader">Highlights</h1>
                <hr
                  className="componentHeaderDivider"
                  size="1"
                  color="lightgrey"
                />
                <ul
                  className="videoItemArrayList"
                  // style={{ width: window.innerWidth }}
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
              <div ref={scrollExperience} className="profileItemListContainer">
                <h1 className="profileItemListHeader">Experiences</h1>
                <hr
                  className="componentHeaderDivider"
                  size="1"
                  color="lightgrey"
                />

                {ShowMoreShowLess("Experience")}
                {thisExperienceArray.length < 3 ? (
                  <hr
                    className="componentBottomDivider"
                    size="1"
                    color="lightgrey"
                    style={{ marginBottom: 20 }}
                  />
                ) : (
                  <hr
                    className="componentBottomDivider"
                    size="1"
                    color="lightgrey"
                  />
                )}
                {thisExperienceArray.length > 3 ? (
                  <button
                    className={"seeMoreSeeLessItemButton"}
                    onClick={() =>
                      setshowMoreShowLessButtonExperience(
                        !showMoreShowLessButtonExperience
                      )
                    }
                    type="button"
                  >
                    {showMoreShowLessButtonTextExperience}
                  </button>
                ) : null}
              </div>
            )}
            {thisTrophyArray.length === 0 ? null : (
              <div
                ref={scrollAccomplishments}
                className="profileItemListContainer"
              >
                <h1 className="profileItemListHeader">Accomplishments</h1>
                <hr
                  className="componentHeaderDivider"
                  size="1"
                  color="lightgrey"
                />

                {ShowMoreShowLess("Accoplishment")}
                {thisTrophyArray.length < 3 ? (
                  <hr
                    className="componentBottomDivider"
                    size="1"
                    color="lightgrey"
                    style={{ marginBottom: 20 }}
                  />
                ) : (
                  <hr
                    className="componentBottomDivider"
                    size="1"
                    color="lightgrey"
                  />
                )}
                {thisTrophyArray.length > 3 ? (
                  <button
                    className={"seeMoreSeeLessItemButton"}
                    onClick={() =>
                      setshowMoreShowLessButtonAccoplishment(
                        !showMoreShowLessButtonAccoplishment
                      )
                    }
                    type="button"
                  >
                    {showMoreShowLessButtonTextAccomplishment}
                  </button>
                ) : null}
              </div>
            )}
            {thisMeasurableArray.length === 0 ? null : (
              <div ref={scrollMeasurables} className="profileItemListContainer">
                <h1 className="profileItemListHeader">Measurables</h1>
                <hr
                  className="componentHeaderDivider"
                  size="1"
                  color="lightgrey"
                />

                {ShowMoreShowLess("Measurables")}
                {thisMeasurableArray.length < 3 ? (
                  <hr
                    className="componentBottomDivider"
                    size="1"
                    color="lightgrey"
                    style={{ marginBottom: 20 }}
                  />
                ) : (
                  <hr
                    className="componentBottomDivider"
                    size="1"
                    color="lightgrey"
                  />
                )}
                {thisMeasurableArray.length > 3 ? (
                  <button
                    className={"seeMoreSeeLessItemButton"}
                    onClick={() =>
                      setshowMoreShowLessButtonMeasurables(
                        !showMoreShowLessButtonMeasurables
                      )
                    }
                    type="button"
                  >
                    {showMoreShowLessButtonTextMeasurables}
                  </button>
                ) : null}
              </div>
            )}
            <div className="spogoLogo">
              <img
                src={SpogoLogo}
                alt="Spogo"
                onClick={() => {
                  window.open("https://spogo.us");
                  mixpanel.track(
                    "Profile Spogo Botton Pressed by External Visitor"
                  );
                }}
              />
            </div>
          </div>
          {/* This needs to be its own component */}
          {/* {window.innerWidth > 1200 && (
            <div className="profileChatRightTab">
              {<ProfileWaitlistComponent />}
            </div>
          )} */}
        </div>
      )}
    </MixpanelConsumer>
  ) : (
    <div className="userNotFoundErrorContainer">
      <div className="errorMessageContainer">
        <div className="errorMessageTextContainer">
          <h1 className="errorHeaderText">User Not Found</h1>
          <p className="errorHeadlineText">
            Sorry, the user's profile you were trying to navigate to wasn't
            found.
          </p>
          <div className="userNotFoundSpogoLogo">
            <img
              src={SpogoLogo}
              alt="Spogo"
              onClick={() => {
                window.location.replace("https://spogo.us");
              }}
            />
          </div>
          <p
            className="returnHomeText"
            onClick={() => {
              window.location.replace("https://spogo.us");
            }}
          >
            <span>Return Home</span>
          </p>
        </div>
        <div className="errorImageContainer">
          <img className="errorImage" src={userErrorImage} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
