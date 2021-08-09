import React, { useState, useEffect, useContext } from "react";
import "./CreateProfile.css";
import Modal from "react-modal";
import WebFont from "webfontloader";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import {
  MdEmail,
  MdMail,
  MdStar,
  MdLocationOn,
  MdClose,
  MdContentCopy,
  MdSettings,
  MdAdd,
} from "react-icons/md";
import { HiOutlinePencil, HiChevronDown } from "react-icons/hi";
import { BsLink45Deg } from "react-icons/bs";
import BlankProfile from "../ProfileScreen/blank_profile.png";
import { MixpanelConsumer } from "react-mixpanel";
import { AuthContext } from "../../../AuthProvider";
import copy from "copy-to-clipboard";
import { useHistory } from "react-router-dom";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import {
  getExperienceArray,
  getMeasurableArray,
  getMediaArray,
  getAccomplishmentArray,
  getUserInfo,
  setUserDict,
  setExperienceArray,
  setAccomplishmentArray,
  setMeasurableArray,
  setMediaArray,
  addExperienceItem,
  getExperienceID,
  setExperienceID,
  setAccomplishmentID,
  setMeasurableID,
  setVideoImageID,
  addAccomplishmentItem,
  getAccomplishmentID,
  addMeasurableItem,
  getMeasurableID,
} from "../../../UserData";
import firebase from "../../../firebase";

import EditableProfileItem from "../../components/EditableProfileItem/EditableProfileItem";
import { ImageItem } from "../../components/VideoItem/VideoItem";
import { VideoItem } from "../../components/VideoItem/VideoItem";

const CreateProfile = (props) => {
  let userUID = props.userUID;
  let history = useHistory();
  const { logout } = useContext(AuthContext);
  const inputFile = React.useRef(null);
  const highlightFile = React.useRef(null);
  const [userUrl, setUserUrl] = useState("");
  const [copyCustomUrlButtonText, setCopyCustomUrlButtonText] =
    useState("Copy Custom Url");
  const [profileImageShown, setProfileImageShown] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [copyUrlModalOpen, setCopyUrlModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Experience States
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [experienceTitleText, setExperienceTitleText] = useState("");
  const [experienceTeamText, setExperienceTeamText] = useState("");
  const [experienceStartMonth, setExperienceStartMonth] = useState("");
  const [experienceStartYear, setExperienceStartYear] = useState("");
  const [experienceEndMonth, setExperienceEndMonth] = useState("");
  const [experienceEndYear, setExperienceEndYear] = useState("");
  const [experienceDescriptionText, setExperienceDescriptionText] =
    useState("");
  const [currentExperienceText, setCurrentExperienceText] = useState(
    "Currently doing this?"
  );
  const [currentExperience, setCurrentExperience] = useState(false);

  // Accomplishment States
  const [accomplishmentModalOpen, setAccomplishmentModalOpen] = useState(false);
  const [accomplishmentTitleText, setAccomplishmentTitleText] = useState("");
  const [accomplishmentMonthReceived, setAccomplishmentMonthReceived] =
    useState("");
  const [accomplishmentYearReceived, setAccomplishmentYearReceived] =
    useState("");
  const [accomplishmentDescriptionText, setAccomplishmentDescriptionText] =
    useState("");

  // Measurable States
  const [measurableModalOpen, setMeasurableModalOpen] = useState(false);
  const [measurableTitleText, setMeasurableTitleText] = useState("");
  const [measurableValueText, setMeasurableValueText] = useState("");

  const [name, setName] = useState(getUserInfo("name"));
  const [sport, setSport] = useState(getUserInfo("sport"));
  const [position, setPosition] = useState(getUserInfo("position"));
  const [showLoadingModal, setShowLoadingModal] = useState(true);

  const [thisAccomplishmentArray, setThisAccomplishmentArray] = useState([]);
  const [thisExperienceArray, setThisExperienceArray] = useState([]);
  const [thisMeasurableArray, setThisMeasurableArray] = useState([]);
  const [thisMediaArray, setThisMediaArray] = useState([]);

  useEffect(() => {
    getDBUserInfo();
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Open Sans", "Public Sans"],
      },
    });
  }, []);

  // Toggles the experience end date between current and not
  const toggleCurrentExperienceText = () => {
    if (currentExperienceText === "Currently doing this?") {
      setCurrentExperienceText("Not currently doing this?");
    } else {
      setCurrentExperienceText("Currently doing this?");
    }
  };

  // Gets user's info and loads it from database
  const getDBUserInfo = async () => {
    let dbPath = firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .collection("User Info");
    let profileData = dbPath.doc("Profile Data");
    await profileData
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          setUserDict(doc.data());
        } else {
          console.log("Doc doesn't exist");
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
          setAccomplishmentArray(doc.data());
        } else {
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
          console.log("Media Array doc not found!");
        }
      })
      .catch((error) => {
        console.log("Error getting media array document:", error);
      });
    console.log("Fetched from DB");
    setUserInfo();
    setArrayID();
    setThisMediaArray(getMediaArray());
    setThisExperienceArray(getExperienceArray());
    setThisAccomplishmentArray(getAccomplishmentArray());
    setThisMeasurableArray(getMeasurableArray());
    setShowLoadingModal(false);
    if (userUID === "noUser") {
      console.log("should go to auth");
      history.push("/auth");
    }
  };

  const setUserInfo = () => {
    setName(getUserInfo("name"));
    setSport(getUserInfo("sport"));
    setPosition(getUserInfo("position"));
  };

  const setArrayID = () => {
    setExperienceID();
    setAccomplishmentID();
    setMeasurableID();
    setVideoImageID();
  };

  const handleCopyText = (e) => {
    setUserUrl(e.target.value);
  };

  const copyToClipboard = () => {
    copy(`spogo.us/${userUrl}`);
  };

  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);
  const [address, setAddress] = React.useState("");

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setAddress(value);
  };

  //Method that checks whether a experience submission is valid
  //If so, adds experience item to arrays
  //If not, shows errors saying the submission fields are invalid
  const [invalidExperienceTitle, setInvalidExperienceTitle] = useState(false);
  const [invalidExperienceTeam, setInvalidExperienceTeam] = useState(false);
  const [invalidExperienceStartDate, setInvalidExperienceStartDate] =
    useState(false);
  const [invalidExperienceEndDate, setInvalidExperienceEndDate] =
    useState(false);

  const checkValidExperience = async () => {
    if (
      experienceTitleText != "" &&
      experienceTeamText != "" &&
      experienceStartMonth != "" &&
      experienceStartYear != "" &&
      ((experienceEndMonth != "" && experienceEndYear != "") ||
        currentExperienceText === "Not currently doing this?")
    ) {
      {
        let experienceDurationText;
        if (currentExperienceText === "Not currently doing this?") {
          experienceDurationText =
            experienceStartMonth + ", " + experienceStartYear + " - Present";
        } else {
          experienceDurationText =
            experienceStartMonth +
            ", " +
            experienceStartYear +
            " - " +
            experienceEndMonth +
            ", " +
            experienceEndYear;
        }
        setExperienceModalOpen(false);
        addExperienceItem(
          experienceTitleText,
          experienceTeamText,
          experienceDurationText,
          experienceDescriptionText,
          getExperienceID()
        );
        setExperienceTitleText("");
        setExperienceTeamText("");
        setExperienceStartMonth("");
        setExperienceStartYear("");
        setExperienceEndMonth("");
        setExperienceEndYear("");
        setExperienceDescriptionText("");
        setCurrentExperienceText("Currently doing this?");
        setCurrentExperience(false)
        setThisExperienceArray([...getExperienceArray()]);
      }
    } else {
      if (experienceTitleText === "") {
        setInvalidExperienceTitle(true);
      }
      if (experienceTeamText === "") {
        setInvalidExperienceTeam(true);
      }
      if (experienceStartMonth === "" || experienceStartYear === "") {
        setInvalidExperienceStartDate(true);
      }
      if (
        (experienceEndMonth === "" || experienceEndYear === "") &&
        currentExperienceText === "Currently doing this?"
      ) {
        setInvalidExperienceEndDate(true);
      }
    }
  };

  //Method that checks whether an accomplishment submission is valid
  //If so, adds accomplishment item to arrays
  //If not, shows errors saying the submission fields are invalid
  const [invalidAccomplishmentTitle, setInvalidAccomplishmentTitle] =
    useState(false);
  const [
    invalidAccomplishmentDateReceived,
    setInvalidAccomplishmentDateReceived,
  ] = useState(false);

  const checkValidAccomplishment = async () => {
    if (
      accomplishmentTitleText != "" &&
      accomplishmentMonthReceived != "" &&
      accomplishmentYearReceived != ""
    ) {
      let accomplishmentDateReceivedText =
        accomplishmentMonthReceived + ", " + accomplishmentYearReceived;
      setAccomplishmentModalOpen(false);
      addAccomplishmentItem(
        accomplishmentTitleText,
        accomplishmentDateReceivedText,
        accomplishmentDescriptionText,
        getAccomplishmentID()
      );
      setAccomplishmentTitleText("");
      setAccomplishmentDescriptionText("");
      setAccomplishmentMonthReceived("");
      setAccomplishmentYearReceived("");
      setInvalidAccomplishmentTitle(false);
      setInvalidAccomplishmentDateReceived(false);
      setThisAccomplishmentArray([...getAccomplishmentArray()]);
    } else {
      if (accomplishmentTitleText === "") {
        setInvalidAccomplishmentTitle(true);
      }
      if (
        accomplishmentMonthReceived === "" ||
        accomplishmentYearReceived === ""
      ) {
        setInvalidAccomplishmentDateReceived(true);
      }
    }
  };

  //Method that checks whether a measurable submission is valid
  //If so, adds measurable item to arrays
  //If not, shows errors saying the submission fields are invalid

  const [invalidMeasurableTitle, setInvalidMeasurableTitle] = useState(false);
  const [invalidMeasurableValue, setInvalidMeasurableValue] = useState(false);

  const checkValidMeasurable = async () => {
    if (measurableTitleText != "" && measurableValueText != "") {
      setMeasurableModalOpen(false);
      addMeasurableItem(
        measurableTitleText,
        measurableValueText,
        getMeasurableID()
      );
      setMeasurableTitleText("");
      setMeasurableValueText("");
      setInvalidMeasurableTitle(false);
      setInvalidMeasurableValue(false);
      setThisMeasurableArray([...getMeasurableArray()]);
    } else {
      if (measurableTitleText === "") {
        setInvalidMeasurableTitle(true);
      }
      if (measurableValueText === "") {
        setInvalidMeasurableValue(true);
      }
    }
  };
  // Sets the experience array to re-render the measurable list for updated changes
  const reloadExperienceArray = () => {
    setThisExperienceArray([...getExperienceArray()]);
  };

  // Sets the accomplishment array to re-render the measurable list for updated changes
  const reloadAccomplishmentArray = () => {
    setThisAccomplishmentArray([...getAccomplishmentArray()]);
  };

  // Sets the measurable array to re-render the measurable list for updated changes
  const reloadMeasurableArray = () => {
    setThisMeasurableArray([...getMeasurableArray()]);
  };

  const profileImageUploadClick = () => {
    inputFile.current.click();
  };

  const highlightUploadClick = () => {
    highlightFile.current.click();
  };

  return (
    <div className="profileScreenContainer">
      <div className="profileContentContainer">
        <>
          <div className="createScreenProfileHeader">
            <div className="topRightIconsContainer">
              <HiOutlinePencil
                className="topRightIconItem"
                onClick={() => setEditModalOpen(true)}
                size={25}
                color={"black"}
              />
              <MdContentCopy
                className="topRightIconItem"
                onClick={() => setCopyUrlModalOpen(true)}
                size={25}
                color={"black"}
              />
              <MdSettings
                className="topRightIconItem"
                onClick={() => setSettingsModalOpen(true)}
                size={25}
                color={"black"}
              />
              <HiChevronDown
                // className="topRightIconItem"
                style={{ marginLeft: -2, cursor: "pointer" }}
                onClick={() => setSettingsModalOpen(true)}
                size={15}
                color={"black"}
              />
            </div>
            <div className="createScreenProfileImageContainer">
              <input
                type="file"
                accept="image/*"
                id="target"
                ref={inputFile}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  uploader(e);
                }}
                style={{ display: "none", outline: "none", border: "none" }}
              />
              <button
                type="button"
                onClick={profileImageUploadClick}
                style={{
                  outline: "none",
                  border: "none",
                  backgroundColor: "whitesmoke",
                }}
              >
                {result ? (
                  <img
                    className="createScreenProfileImage"
                    ref={imageRef}
                    src={result}
                  />
                ) : (
                  <img
                    className="createScreenProfileImage"
                    src={BlankProfile}
                  />
                )}
              </button>
            </div>
            <div className="createScreenProfileTextContainer">
              <div className="createScreenNameSportTextContainer">
                <h1 className="createScreenWebsiteUserName">{name}</h1>
                <h2 className="createScreenWebsiteSportPositionText">
                  {position === "" ? sport : sport + " - " + position}
                </h2>
              </div>

              <div className="createScreenLocationIconTextContainer">
                <MdLocationOn color={"#EA4335"} size={20} />
                <h3 className="createScreenLocationText">Seattle, WA</h3>
              </div>

              <div className="createScreenSocialIconsRow">
                <FaInstagram
                  className="createScreenSocialIcon"
                  // onClick={() =>
                  //   // window.location.replace("www.instagram.com/" + instagram)
                  //   {
                  //     mixpanel.track(
                  //       'Profile Icons Pressed by External Visitor',
                  //       { 'Profile Icon': 'Instagram' }
                  //     );
                  //     window.open('https://instagram.com/' + instagram);
                  //   }
                  // }
                  size={25}
                  color={"#E1306C"}
                />

                <FaTwitter
                  className="createScreenSocialIcon"
                  // onClick={() =>
                  //   // window.location.replace("www.instagram.com/" + instagram)
                  //   {
                  //     mixpanel.track(
                  //       'Profile Icons Pressed by External Visitor',
                  //       { 'Profile Icon': 'Twitter' }
                  //     );
                  //     window.open('https://twitter.com/' + twitter);
                  //   }
                  // }
                  size={25}
                  color={"#1DA1F2"}
                />

                <MdMail
                  className="createScreenSocialIcon"
                  // onClick={() => {
                  //   mixpanel.track(
                  //     'Profile Icons Pressed by External Visitor',
                  //     { 'Profile Icon': 'Email' }
                  //   );
                  //   window.open('mailto:' + email);
                  // }}
                  // onClick={() =>
                  //   // window.location.replace("www.instagram.com/" + instagram)
                  //   window.open("https://instagram.com/" + instagram)
                  // }
                  size={25}
                  color={"#5D4D4A"}
                />

                <BsLink45Deg
                  className="createScreenSocialIcon"
                  // onClick={() => setWildcardLinkModalOpen(true)}
                  size={25}
                  color={"#ffae42"}
                />
              </div>
            </div>
          </div>
          <div>
            <p></p>
          </div>
          <div className="createScreenBioContainer">
            <h1>Bio</h1>
            <hr
              className="createScreenComponentHeaderDivider"
              color="lightgrey"
              size="1"
            />
            <p>This is an empty bio, edit as you see fit.</p>
          </div>
        </>
        <div className="createScreenProfileItemListContainer">
          <input
            type="file"
            accept="image/*, video/*"
            id="target"
            ref={highlightFile}
            // onChange={onImageChange}
            style={{ display: "none" }}
          />
          <div className="profileItemListHeaderContainer">
            <h1 className="createScreenProfileItemListHeader">Highlights</h1>
            <MdAdd
              className="profileItemListAddIcons"
              size={25}
              onClick={() => highlightUploadClick}
            />
          </div>
          <hr
            className="createScreenComponentHeaderDivider"
            size="1"
            color="lightgrey"
          />
          <ul className="createScreenVideoItemArrayList">
            {thisMediaArray.map((item) => {
              if (item.media === "photo") {
                return <ImageItem url={item.url} />;
              } else {
                return <VideoItem url={item.url} />;
              }
            })}
          </ul>
        </div>
        <div className="createScreenProfileItemListContainer">
          <div className="profileItemListHeaderContainer">
            <h1 className="createScreenProfileItemListHeader">Experiences</h1>
            <MdAdd
              className="profileItemListAddIcons"
              size={25}
              onClick={() => setExperienceModalOpen(true)}
            />
          </div>
          <hr
            className="createScreenComponentHeaderDivider"
            size="1"
            color="lightgrey"
          />
          <ul>
            {thisExperienceArray.map((item) => (
              <EditableProfileItem
                iconName="crown"
                color="#ffbb48"
                title={item.title}
                team={item.team}
                time={item.duration}
                description={item.description}
                idNum={item.idNum}
                userUID={userUID}
                callbackReloadList={reloadExperienceArray}
              />
            ))}
          </ul>
          <hr className="componentBottomDivider" size="1" color="lightgrey" />
        </div>
        <div className="createScreenProfileItemListContainer">
          <div className="profileItemListHeaderContainer">
            <h1 className="createScreenProfileItemListHeader">
              Accomplishments
            </h1>
            <MdAdd
              className="profileItemListAddIcons"
              size={25}
              onClick={() => setAccomplishmentModalOpen(true)}
            />
          </div>
          <hr
            className="createScreenComponentHeaderDivider"
            size="1"
            color="lightgrey"
          />
          <ul>
            {thisAccomplishmentArray.map((item) => (
              <EditableProfileItem
                iconName="trophy"
                color="#A08864"
                title={item.title}
                time={item.duration}
                description={item.description}
                idNum={item.idNum}
                userUID={userUID}
                callbackReloadList={reloadAccomplishmentArray}
              />
            ))}
          </ul>
          <hr className="componentBottomDivider" size="1" color="lightgrey" />
        </div>
        <div
          className="createScreenProfileItemListContainer"
          style={{ marginBottom: 80 }}
        >
          <div className="profileItemListHeaderContainer">
            <h1 className="createScreenProfileItemListHeader">Measurables</h1>
            <MdAdd
              className="profileItemListAddIcons"
              size={25}
              onClick={() => setMeasurableModalOpen(true)}
            />
          </div>
          <hr
            className="createScreenComponentHeaderDivider"
            size="1"
            color="lightgrey"
          />
          <ul>
            {thisMeasurableArray.map((item) => (
              <EditableProfileItem
                iconName="rocket-launch"
                color="dodgerblue"
                title={item.title}
                time={item.value}
                idNum={item.idNum}
                userUID={userUID}
                callbackReloadList={reloadMeasurableArray}
              />
            ))}
          </ul>
          <hr className="componentBottomDivider" size="1" color="lightgrey" />
        </div>

        {/* Add Item Modals */}
        {/* Add Item Modals */}
        {/* Add Item Modals */}
        {/* Add Item Modals */}
        {/* Add Item Modals */}

        {/* Settings Modal */}
        <Modal
          isOpen={settingsModalOpen}
          onRequestClose={() => setSettingsModalOpen(false)}
          className="settingsModal"
          overlayClassName="settingsItemAddModalOverlay"
        >
          <p
            className="settingsItems"
            // style={{ cursor: 'pointer' }}
            onClick={() => logout()}
          >
            Sign Out
          </p>
        </Modal>
        {/* Settings Modal */}

        {/* Copy Url Modal */}
        <Modal
          isOpen={copyUrlModalOpen}
          onRequestClose={() => setCopyUrlModalOpen(false)}
          className="copyUrlModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div className="modalHeaderContainer">
            <p style={{ textAlign: "center", width: "100%" }}>
              Congrats on Creating Your Spogo Profile!
            </p>
            <MdClose
              style={{ cursor: "pointer" }}
              onClick={() => setCopyUrlModalOpen(false)}
              size={20}
              color={"grey"}
            />
          </div>
          <p className="copyUrlModalTaglineText">
            Choose your custom url below.
          </p>
          <input
            required
            className="copyUrlModalTextInputItem"
            type="name"
            maxLength="100"
            value={userUrl}
            onChange={handleCopyText}
          />
          <p className="copyUrlSpogoText">spogo.us/</p>
          <div>
            <button
              onClick={() => {
                copyToClipboard();
                setCopyCustomUrlButtonText("Link has been copied!");
              }}
              className="addEditItemModalButton"
              type={"button"}
            >
              {copyCustomUrlButtonText}
            </button>
          </div>
        </Modal>
        {/* Copy Url Modal */}

        {/* Profile Edit Modal */}
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          className="editModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div className="modalHeaderContainer">
            <p>Edit Profile</p>
            <MdClose
              style={{ cursor: "pointer" }}
              onClick={() => setEditModalOpen(false)}
              size={20}
              color={"grey"}
            />
          </div>
          <div>
            <p className="textInputHeaders">Name</p>
            <input
              required
              className="modalTextInputItems"
              type="name"
              maxLength="100"
            />
            <div className="editModalSportPositionRowContainer">
              <div className="editModalSportPositionRowItemsContainer">
                <p className="textInputHeaders">Sport</p>
                <select className="modalTextInputItems">
                  <option>Sport</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Soccer</option>
                  <option>Baseball</option>
                  <option>Lacrosse</option>
                  <option>Tennis</option>
                  <option>Swimming</option>
                  <option>Softball</option>
                  <option>Track and Field</option>
                  <option>Hockey</option>
                  <option>Golf</option>
                  <option>Rowing</option>
                  <option>Volleyball</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="editModalSportPositionRowItemsContainer">
                <p className="textInputHeaders">Position</p>
                <input
                  required
                  className="modalTextInputItems"
                  placeholder="Ex: QB, PG, CM"
                  type="position"
                  maxLength="100"
                />
              </div>
            </div>
            <p className="textInputHeaders">Location</p>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={{ types: ["(cities)"] }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      className: "modalTextInputItems",
                      placeholder: "Ex: Seattle, WA",
                    })}
                  />

                  <div>
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#3eb489" : "#fff",
                        cursor: "pointer",
                        marginBottom: 5,
                        fontSize: 12,
                        fontFamily: "Open Sans",
                        marginTop: 2,
                        marginLeft: 3,
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <p className="textInputHeaders">Instagram</p>
            <input
              required
              className="modalTextInputItems"
              type="instagram"
              maxLength="100"
            />
            <p className="textInputHeaders">Twitter</p>
            <input
              required
              className="modalTextInputItems"
              type="twitter"
              maxLength="100"
            />
            <p className="textInputHeaders">Email</p>
            <input
              required
              className="modalTextInputItems"
              type="email"
              maxLength="100"
            />
            <p className="textInputHeaders">Link</p>
            <input
              required
              className="modalTextInputItems"
              type="link"
              maxLength="100"
            />
            <p className="textInputHeaders">Bio</p>
            <textarea
              style={{ resize: "none" }}
              className="modalTextInputItems"
              rows={5}
              name={"description"}
            />
          </div>
          <div>
            <button className="addEditItemModalButton" type={"button"}>
              Confirm
            </button>
          </div>
        </Modal>
        {/* Profile Edit Modal */}

        {/* Experience Modal */}
        <Modal
          isOpen={experienceModalOpen}
          onRequestClose={() => {
            setExperienceModalOpen(false);
            setExperienceTitleText("");
            setExperienceTeamText("");
            setExperienceStartMonth("");
            setExperienceStartYear("");
            setExperienceEndMonth("");
            setExperienceEndYear("");
            setExperienceDescriptionText("");
            setInvalidExperienceTitle(false);
            setInvalidExperienceTeam(false);
            setInvalidExperienceStartDate(false);
            setInvalidExperienceEndDate(false);
            setCurrentExperienceText("Currently doing this?");
            setCurrentExperience(false)
          }}
          className="experienceModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div className="expModalContainer">
            <div className="modalHeaderContainer">
              <p>Add Experience</p>
              <MdClose
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setExperienceModalOpen(false);
                  setExperienceTitleText("");
                  setExperienceTeamText("");
                  setExperienceStartMonth("");
                  setExperienceStartYear("");
                  setExperienceEndMonth("");
                  setExperienceEndYear("");
                  setExperienceDescriptionText("");
                  setInvalidExperienceTitle(false);
                  setInvalidExperienceTeam(false);
                  setInvalidExperienceStartDate(false);
                  setInvalidExperienceEndDate(false);
                  setCurrentExperienceText("Currently doing this?");
                  setCurrentExperience(false)
                }}
                size={20}
                color={"grey"}
              />
            </div>
            <div>
              <form>
                <p className="textInputHeaders">Title</p>
                <input
                  required
                  className="modalTextInputItems"
                  type="text"
                  maxLength="100"
                  onChange={(text) => {
                    setExperienceTitleText(text.target.value);
                    setInvalidExperienceTitle(false);
                  }}
                />
                {invalidExperienceTitle && (
                  <h1 className="invalidText">Title is required</h1>
                )}
                <p className="textInputHeaders">Team</p>
                <input
                  required
                  className="modalTextInputItems"
                  type="text"
                  maxLength="100"
                  onChange={(text) => {
                    setExperienceTeamText(text.target.value);
                    setInvalidExperienceTeam(false);
                  }}
                />
                {invalidExperienceTeam && (
                  <h1 className="invalidText">Team is required</h1>
                )}
                <div className="modalDatePickerContainer">
                  <div className="expModalDatePickerItemContainer">
                    <p className="textInputHeaders">Start Date</p>
                    <div className="datePickerRow">
                      <select
                        className="modalDatePicker"
                        required
                        name={"Month"}
                        onChange={(event) => {
                          setInvalidExperienceStartDate(false);
                          setExperienceStartMonth(event.target.options[event.target.selectedIndex].text);
                        }}
                      >
                        <option selected hidden>
                          Month
                        </option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                      {/* <div style={{width: '0.5%'}}></div> */}
                      <div className="datePickerRowMiddleDivider"></div>
                      <select
                        className="modalDatePicker"
                        required
                        name={"Year"}
                        onChange={(event) => {
                          setInvalidExperienceStartDate(false);
                          setExperienceStartYear(event.target.options[event.target.selectedIndex].text);
                        }}
                      >
                        <option selected hidden>
                          Year
                        </option>
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                        <option>2009</option>
                        <option>2008</option>
                        <option>2007</option>
                        <option>2006</option>
                        <option>2005</option>
                        <option>2004</option>
                        <option>2003</option>
                        <option>2002</option>
                        <option>2001</option>
                        <option>2000</option>
                      </select>
                    </div>
                    {invalidExperienceStartDate && (
                      <h1 className="invalidText">
                        Start month and year is required
                      </h1>
                    )}
                  </div>
                  <div style={{ width: 20 }}></div>
                  <div className="expModalDatePickerItemContainer">
                    <p className="textInputHeaders">End Date</p>
                    <div className="datePickerRow">
                      {!currentExperience ? (
                        <>
                          <select
                            className="modalDatePicker"
                            required
                            name={"Month"}
                            onChange={(event) => {
                              setInvalidExperienceEndDate(false);
                              setExperienceEndMonth(event.target.options[event.target.selectedIndex].text);
                            }}
                          >
                            <option selected hidden>
                              Month
                            </option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </select>
                          <div className="datePickerRowMiddleDivider"></div>
                          <select
                            className="modalDatePicker"
                            required
                            name={"Year"}
                            onChange={(event) => {
                              setInvalidExperienceEndDate(false);
                              setExperienceEndYear(event.target.options[event.target.selectedIndex].text);
                            }}
                          >
                            <option selected hidden>
                              Year
                            </option>
                            <option>2021</option>
                            <option>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                            <option>2017</option>
                            <option>2016</option>
                            <option>2015</option>
                            <option>2014</option>
                            <option>2013</option>
                            <option>2012</option>
                            <option>2011</option>
                            <option>2010</option>
                            <option>2009</option>
                            <option>2008</option>
                            <option>2007</option>
                            <option>2006</option>
                            <option>2005</option>
                            <option>2004</option>
                            <option>2003</option>
                            <option>2002</option>
                            <option>2001</option>
                            <option>2000</option>
                          </select>
                        </>
                      ) : (
                        <>
                          <input
                            value="Month"
                            readOnly={true}
                            className="modalDatePicker"
                            style={{
                              outline: "none",
                              borderStyle: "solid",
                              boxShadow: "none",
                              borderColor: "#ededed",
                              backgroundColor: "#00000014",
                              borderRadius: 2,
                              paddingLeft: 5,
                              color: "#0000004D",
                            }}
                          />
                          <div className="datePickerRowMiddleDivider"></div>
                          <input
                            value="Year"
                            readOnly={true}
                            className="modalDatePicker"
                            style={{
                              outline: "none",
                              // border: 'none',
                              borderStyle: "solid",
                              boxShadow: "none",
                              borderColor: "#ededed",
                              backgroundColor: "#00000014",
                              borderRadius: 2,
                              paddingLeft: 5,
                              color: "#0000004D",
                            }}
                          />
                        </>
                      )}
                    </div>
                    {invalidExperienceEndDate && (
                      <h1 className="invalidText" style={{ marginBottom: 5 }}>
                        End month and year is required
                      </h1>
                    )}
                    <p className="presentTimeText">
                      {currentExperienceText}{" "}
                      <span
                        onClick={() => {
                          setInvalidExperienceEndDate(false);
                          setCurrentExperience(!currentExperience);
                          toggleCurrentExperienceText();
                        }}
                      >
                        Click here.
                      </span>
                    </p>
                  </div>
                </div>
                <p className="textInputHeaders">Description</p>
                <textarea
                  style={{ resize: "none" }}
                  className="modalTextInputItems"
                  rows={5}
                  name={"description"}
                  onChange={(text) => {
                    setExperienceDescriptionText(text.target.value);
                  }}
                />
              </form>
            </div>
            <div>
              <button
                className="addEditItemModalButton"
                type={"button"}
                onClick={() => checkValidExperience()}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
        {/* Experience Modal */}
        {/* Accomplishment Modal */}
        <Modal
          isOpen={accomplishmentModalOpen}
          onRequestClose={() => {
            setAccomplishmentModalOpen(false);
            setAccomplishmentTitleText("");
            setAccomplishmentDescriptionText("");
            setAccomplishmentMonthReceived("");
            setAccomplishmentYearReceived("");
            setInvalidAccomplishmentTitle(false);
            setInvalidAccomplishmentDateReceived(false);
          }}
          className="accomplishmentModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div>
            <div className="modalHeaderContainer">
              <p>Add Accomplishment</p>
              <MdClose
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setAccomplishmentModalOpen(false);
                  setAccomplishmentTitleText("");
                  setAccomplishmentDescriptionText("");
                  setAccomplishmentMonthReceived("");
                  setAccomplishmentYearReceived("");
                  setInvalidAccomplishmentTitle(false);
                  setInvalidAccomplishmentDateReceived(false);
                }}
                size={20}
                color={"grey"}
              />
            </div>
            <div>
              <form>
                <p className="textInputHeaders">Title</p>
                <input
                  placeholder="Ex: MVP, State Title"
                  required
                  className="modalTextInputItems"
                  type="text"
                  maxLength="100"
                  onChange={(text) => {
                    setAccomplishmentTitleText(text.target.value);
                    setInvalidAccomplishmentTitle(false);
                  }}
                />
                {invalidAccomplishmentTitle && (
                  <h1 className="invalidText">Title is required</h1>
                )}
                <div className="modalDatePickerContainer">
                  <div className="accomplishmentMeasurableDatePickerItemContainer">
                    <p className="textInputHeaders">Date Received</p>
                    <div className="datePickerRow">
                      <select
                        className="modalDatePicker"
                        required
                        name={"Month"}
                        onChange={(event) => {
                          setInvalidAccomplishmentDateReceived(false);
                          setAccomplishmentMonthReceived(event.target.options[event.target.selectedIndex].text);
                        }}
                      >
                        <option selected hidden>
                          Month
                        </option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                      {/* <div style={{width: '0.5%'}}></div> */}
                      <div className="datePickerRowMiddleDivider"></div>
                      <select
                        className="modalDatePicker"
                        required
                        name={"Year"}
                        onChange={(event) => {
                          setInvalidAccomplishmentDateReceived(false);
                          setAccomplishmentYearReceived(event.target.options[event.target.selectedIndex].text);
                        }}
                      >
                        <option selected hidden>
                          Year
                        </option>
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                        <option>2009</option>
                        <option>2008</option>
                        <option>2007</option>
                        <option>2006</option>
                        <option>2005</option>
                        <option>2004</option>
                        <option>2003</option>
                        <option>2002</option>
                        <option>2001</option>
                        <option>2000</option>
                      </select>
                    </div>
                    {invalidAccomplishmentDateReceived && (
                      <h1 className="invalidText">
                        Month and year received is required
                      </h1>
                    )}
                    {/* <p className="presentTimeText">
                    Currently doing this? <span span onClick={() => getCurrentDate()}>Click here.</span>
                  </p> */}
                  </div>
                </div>
                <p className="textInputHeaders">Description</p>
                <textarea
                  style={{ resize: "none" }}
                  className="modalTextInputItems"
                  rows={5}
                  name={"description"}
                  onChange={(text) => {
                    setAccomplishmentDescriptionText(text.target.value);
                  }}
                />
              </form>
            </div>
            <div>
              <button
                className="addEditItemModalButton"
                type={"button"}
                onClick={() => checkValidAccomplishment()}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
        {/* Accomplishment Modal */}
        {/* Measurable Modal */}
        <Modal
          isOpen={measurableModalOpen}
          onRequestClose={() => {
            setMeasurableModalOpen(false);
            setMeasurableTitleText("");
            setMeasurableValueText("");
            setInvalidMeasurableTitle(false);
            setInvalidMeasurableValue(false);
          }}
          className="measurableModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div>
            <div className="modalHeaderContainer">
              <p>Add Measurable</p>
              <MdClose
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMeasurableModalOpen(false);
                  setMeasurableTitleText("");
                  setMeasurableValueText("");
                  setInvalidMeasurableTitle(false);
                  setInvalidMeasurableValue(false);
                }}
                size={20}
                color={"grey"}
              />
            </div>
            <div>
              <form>
                <p className="textInputHeaders">Title</p>
                <input
                  required
                  placeholder="Ex: 40 time, Height, GPA"
                  className="modalTextInputItems"
                  type="text"
                  maxLength="100"
                  onChange={(text) => {
                    setMeasurableTitleText(text.target.value);
                    setInvalidMeasurableTitle(false);
                  }}
                />
                {invalidMeasurableTitle && (
                  <h1 className="invalidText">Title is required</h1>
                )}
                <p className="textInputHeaders">Value</p>
                <input
                  placeholder="Ex: 4.52, 6'1, 3.50"
                  className="modalTextInputItems"
                  rows={5}
                  name={"value"}
                  onChange={(text) => {
                    setMeasurableValueText(text.target.value);
                    setInvalidMeasurableValue(false);
                  }}
                />
                {invalidMeasurableValue && (
                  <h1 className="invalidText">Value is required</h1>
                )}
              </form>
            </div>
            <div>
              <button
                className="addEditItemModalButton"
                type={"button"}
                onClick={() => checkValidMeasurable()}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
        {/* Measurable Modal */}
        {/* Loading Modal */}
        <Modal
          isOpen={showLoadingModal}
          className="loadingModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "white" }}
          >
            <h1>LOADING MODAL</h1>
          </div>
        </Modal>
      </div>
      {/* Measurable Modal */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
    </div>
  );
};

export default CreateProfile;
