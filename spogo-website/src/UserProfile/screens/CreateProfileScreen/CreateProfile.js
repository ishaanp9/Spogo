import React, { useState, useEffect, useContext, useRef } from "react";
import "./CreateProfile.css";
import Modal from "react-modal";
import WebFont from "webfontloader";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import {
  MdEmail,
  MdMail,
  MdLocationOn,
  MdClose,
  MdContentCopy,
  MdSettings,
  MdAdd,
} from "react-icons/md";
import { HiOutlinePencil, HiChevronDown } from "react-icons/hi";
import { BsLink45Deg } from "react-icons/bs";
import { MixpanelConsumer } from "react-mixpanel";
import { AuthContext } from "../../../AuthProvider";
import copy from "copy-to-clipboard";
import { useHistory, useLocation } from "react-router-dom";
import loadingGIF from "../../../loading.gif";
import LoadingSpinner from './loading-spinner.gif'
import SoccerLoading from './soccer-loading.gif'
import spogoLogo from "../../../spogo_logo.png";
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
  getUserDict,
  addUserInfo,
  setStoredUsername,
  getStoredUsername,
  setUserDataCollected,
  getUserDataCollected,
} from '../../../UserData';
import firebase from '../../../firebase';
import EditableProfileItem from '../../components/EditableProfileItem/EditableProfileItem';
import { UserDataContext } from '../../../App';
import VideoList from '../../components/VideoList/VideoList';

const CreateProfile = (props) => {
  const { getUserUID, isUserListenerFinished } = useContext(UserDataContext);
  let userUID = getUserUID();
  let history = useHistory();
  const { logout } = useContext(AuthContext);
  const inputFile = React.useRef(null);
  const [username, setUsername] = useState(getStoredUsername());
  const [showLinkCopiedMessage, setShowLinkCopiedMessage] = useState(false);
  const [copyCustomUrlButtonText, setCopyCustomUrlButtonText] =
    useState("Copy Custom Url");
  const [profileImageShown, setProfileImageShown] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [copyUrlModalOpen, setCopyUrlModalOpen] = useState(false);
  const [profileEditModalOpen, setProfileEditModalOpen] = useState(false);
  const [bioModalOpen, setBioModalOpen] = useState(false);

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
    'Currently doing this?'
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
  const [measurableTitleText, setMeasurableTitleText] = useState('');
  const [measurableValueText, setMeasurableValueText] = useState('');

  const [profileImage, setProfileImage] = useState(
    getUserInfo('profile-image')
  );
  const [name, setName] = useState(getUserInfo('name'));
  const [sport, setSport] = useState(getUserInfo('sport'));
  const [position, setPosition] = useState(getUserInfo('position'));
  const [location, setLocation] = useState(getUserInfo('location'));
  const [instagram, setInstagram] = useState(getUserInfo('instagram-handle'));
  const [twitter, setTwitter] = useState(getUserInfo('twitter-handle'));
  const [preferredEmail, setPreferredEmail] = useState(
    getUserInfo("preferred-email")
  );
  const [wildcard, setWildcard] = useState(getUserInfo("wildcard"));
  const [bio, setBio] = useState(getUserInfo("bio"));

  const [showLoadingModal, setShowLoadingModal] = useState(true);

  const [thisAccomplishmentArray, setThisAccomplishmentArray] = useState([]);
  const [thisExperienceArray, setThisExperienceArray] = useState([]);
  const [thisMeasurableArray, setThisMeasurableArray] = useState([]);
  const [thisMediaArray, setThisMediaArray] = useState([]);

  const pathLocation = useLocation();
  let fromDescriptionScreen = false;
  if (pathLocation.state != undefined) {
    console.log(fromDescriptionScreen)
    fromDescriptionScreen = pathLocation.state;
  }

  useEffect(() => {
    console.log(fromDescriptionScreen);
    if (fromDescriptionScreen) {
      fromDescriptionScreen = false;
      setProfileBasedOnDBFetch();
    } else {
      userUID = getUserUID();
      getDBUserInfo();
    }
  }, []);

  //Listens to see whether firebase onAuthStateChanged is finished, then performs the database call
  // if (isUserListenerFinished() && createProfileInitialized === true) {
  //   // console.log('Set UID')
  //   setTimeout(() => {
  //     userUID = getUserUID()
  //     getDBUserInfo()
  //   }, 2000)
  // }

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
    await firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          setStoredUsername(doc.data().username);
        } else {
          console.log("Doc doesn't exist");
        }
      })
      .catch((error) => {
        console.log("Error getting username:", error);
      });
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
    let accomplishmentArray = dbPath.doc('Accomplishment Array');
    await accomplishmentArray
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
    setProfileBasedOnDBFetch();
  };

  //Key used to refresh the video list
  const [refreshKey, setRefreshKey] = useState(0);

  //Sets UserData based on information fetched from database
  const setProfileBasedOnDBFetch = () => {
    setUserInfo();
    setArrayID();
    setThisExperienceArray(getExperienceArray());
    setThisAccomplishmentArray(getAccomplishmentArray());
    setThisMeasurableArray(getMeasurableArray());
    setThisMediaArray(getMediaArray());
    setShowLoadingModal(false);
    setUserDataCollected();
    setRefreshKey((prev) => prev + 1);
    setUsername(getStoredUsername());
    console.log(getUserInfo("sign-up-finished"))
    if (getUserInfo("sign-up-finished") === false || getUserInfo("sign-up-finished") === null) {
      history.push("/auth/sign-up/location-sport-position");
    }
    if (userUID === "noUser") {
      if (showLoadingModal) {
        console.log("should go to auth");
        history.push("/auth");
      }
    }
  };

  //Sets user information based on the UserInfoDict
  const setUserInfo = async () => {
    try {
      const profileImageUri = await firebase
        .storage()
        .ref(getUserInfo('profile-image'));
      const downloadableURL = await profileImageUri.getDownloadURL();
      setProfileImage(downloadableURL);
    } catch (e) {
      console.log(e);
    }
    setName(getUserInfo("name"));
    setSport(getUserInfo("sport"));
    setPosition(getUserInfo("position"));
    setLocation(getUserInfo("location"));
    setInstagram(getUserInfo("instagram-handle"));
    setTwitter(getUserInfo("twitter-handle"));
    setPreferredEmail(getUserInfo("preferred-email"));
    setWildcard(getUserInfo("wildcard"));
    setBio(getUserInfo("bio"));
  };

  const setArrayID = () => {
    setExperienceID();
    setAccomplishmentID();
    setMeasurableID();
    setVideoImageID();
  };

  const [invalidUsername, setInvalidUsername] = useState(false);

  //Method that handles what to do when the user clicks the copy to clipboard icon
  const copyToClipboard = async () => {
    console.log(username);
    if (getUserInfo('custom-url-created')) {
      console.log(`spogo.us/me/${username}`);
      copy(`spogo.us/me/${username}`);
      setShowLinkCopiedMessage(true);
    } else {
      //Checks whether the username entered has been taken
      await firebase
        .firestore()
        .collection("Users")
        .where("username", "==", username)
        .get()
        .then(async (querySnapshot) => {
          if (querySnapshot.empty) {
            addUsernameToDB();
          } else {
            setInvalidUsername(true);
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      copy(`spogo.us/me/${username}`);
    }
  };

  //Method that adds a user's username to the database
  const addUsernameToDB = async () => {
    addUserInfo("custom-url-created", true);
    await updateUserInfoDictInDB();
    await firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .set({
        username: username,
      })
      .then(() => {
        console.warn("Added Username to DB");
      })
      .catch((e) => console.log(e));
    setStoredUsername(username);
    setCopyUrlModalOpen(false);
  };

  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);

  function useDisplayImage() {
    const [result, setResult] = useState("");

    async function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      if (e.target.files[0]) {
        reader.readAsDataURL(imageFile);
      }

      setUploading(true);
      setTransferred(0);
      let profileImageTimeUploaded = new Date().getTime();
      let oldProfileImage = getUserInfo('profile-image');
      let mediaReference =
        imageFile.name +
        '-' +
        profileImageTimeUploaded +
        userUID.charAt(0) +
        userUID.charAt(3) +
        userUID.charAt(6);

      const task = firebase
        .storage()
        .ref(mediaReference)
        .put(e.target.files[0])
        .then(() => {
          console.log('Storage Upload Succeeded');
        });

      //Code to make a progress bar or upload animation
      // task.on('state_changed', snapshot => {
      //   setTransferred(
      //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      //   );
      // });

      try {
        await task;
        setTransferred(0);
        addUserInfo("profile-image", mediaReference);
        await updateUserInfoDictInDB();
        await deleteFileFromFBStorage(oldProfileImage);
      } catch (e) {
        console.log(e);
      }

      try {
        const profileImageUri = await firebase
          .storage()
          .ref(getUserInfo('profile-image'));
        const downloadableURL = await profileImageUri.getDownloadURL();
        setProfileImage(downloadableURL);
        setUploading(false);
      } catch (e) {
        console.log(e);
      }
      console.log('Profile Upload Operation Finished');
    }
    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setLocationHolder(value);
  };

  //Method that takes a reference and deletes the firebase storage file named to that reference
  const deleteFileFromFBStorage = async (deleteRef) => {
    if (deleteRef != "blank_profile.png") {
      let mediaName = firebase.storage().ref(deleteRef);
      await mediaName
        .delete()
        .then(() => {
          console.log(`${mediaName}has been deleted successfully.`);
        })
        .catch((e) => console.log(e));
    }
  };

  //Gets the index of the month based on the month name
  const getMonthNumber = (month) => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthIndexNum = 0;
    for (let i = 0; i < monthNames.length; i++) {
      if (month === monthNames[i]) {
        monthIndexNum = i + 1;
      }
    }
    return monthIndexNum;
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
  const [endDateBeforeStartDateError, setEndDateBeforeStartDateError] =
    useState(false);

  const checkValidExperience = async () => {
    if (
      //Title not blank
      experienceTitleText != "" &&
      //Team not blank
      experienceTeamText != "" &&
      //Start month not blank
      experienceStartMonth != "" &&
      //Start year not blank
      experienceStartYear != "" &&
      //End date not blank
      ((experienceEndMonth != "" && experienceEndYear != "") ||
        currentExperienceText === "Not currently doing this?")
    ) {
      {
        let startDateValue = 0;
        let endDateValue = 0;
        let endDateAfterStartDate = true;
        //If the end date isn't current
        if (currentExperienceText != "Not currently doing this?") {
          startDateValue += parseInt(experienceStartYear, 10);
          startDateValue += getMonthNumber(experienceStartMonth) / 13;
          endDateValue += parseInt(experienceEndYear, 10);
          endDateValue += getMonthNumber(experienceEndMonth) / 13;
          console.log(startDateValue)
          console.log(endDateValue)
          if (endDateValue < startDateValue) {
            endDateAfterStartDate = false;
          }
        }
        if (endDateAfterStartDate) {
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
          setCurrentExperience(false);
          setThisExperienceArray([...getExperienceArray()]);
          setExperienceArrayDB();
        } else {
          setEndDateBeforeStartDateError(true);
        } 
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
      setAccomplishmentArrayDB();
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
      await setMeasurableArrayDB();
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

  //Holder variables for the profile edit modal
  const [nameHolder, setNameHolder] = useState("");
  const [sportHolder, setSportHolder] = useState("");
  const [otherSportHolder, setOtherSportHolder] = useState("");
  const [positionHolder, setPositionHolder] = useState("");
  const [locationHolder, setLocationHolder] = useState("");
  const [instagramHolder, setInstagramHolder] = useState("");
  const [twitterHolder, setTwitterHolder] = useState("");
  const [preferredEmailHolder, setPreferredEmailHolder] = useState("");
  const [wildcardHolder, setWildcardHolder] = useState("");
  const [bioHolder, setBioHolder] = useState("");
  const [invalidNameHolder, setInvalidNameHolder] = useState(false);
  const [invalidSportHolder, setInvalidSportHolder] = useState(false);
  const [invalidLocationHolder, setInvalidLocationHolder] = useState(false);
  const [invalidPreferredEmailHolder, setInvalidPreferredEmailHolder] =
    useState(false);
  const [invalidWildcardHolder, setInvalidWildcardHolder] = useState(false);

  //Method that takes in sport name and returns the index of the sport in the sport selector
  const getSportIndex = (sportName) => {
    let sportNamesArray = [
      "Football",
      "Basketball",
      "Soccer",
      "Baseball",
      "Lacrosse",
      "Tennis",
      "Swimming",
      "Softball",
      "Track and Field",
      "Hockey",
      "Golf",
      "Rowing",
      "Volleyball",
      "Other",
    ];
    //Other sport is 13, so if the sport name isn't found we want to set the sport to other
    let sportIndex = 13;
    for (let i = 0; i < sportNamesArray.length; i++) {
      if (sportName === sportNamesArray[i]) {
        sportIndex = i;
      }
    }
    return sportIndex;
  };

  let validator = require("email-validator");

  //Method that checks submission of profile edit modal and makes sure all values are valid
  const handleProfileEditModalSubmission = async () => {
    let validProfileSubmission = true;
    if (nameHolder === "") {
      setInvalidNameHolder(true);
      validProfileSubmission = false;
    }
    if (sportHolder === "") {
      setInvalidSportHolder(true);
      validProfileSubmission = false;
    } else {
      if (sportHolder === "Other") {
        if (otherSportHolder === "") {
          setInvalidSportHolder(true);
          validProfileSubmission = false;
        }
      }
    }
    if (locationHolder === "") {
      validProfileSubmission = false;
      setInvalidLocationHolder(true);
    }
    if (
      preferredEmailHolder === "" ||
      !validator.validate(preferredEmailHolder)
    ) {
      validProfileSubmission = false;
      setInvalidPreferredEmailHolder(true);
    }
    if (wildcardHolder != "") {
      if (wildcardHolder.substring(0, 8) != "https://") {
        validProfileSubmission = false;
        setInvalidWildcardHolder(true);
      }
    }
    if (validProfileSubmission) {
      setProfileEditModalOpen(false);
      addUserInfo("name", nameHolder);
      if (sportHolder === "Other") {
        addUserInfo("sport", otherSportHolder);
      } else {
        addUserInfo("sport", sportHolder);
      }
      addUserInfo("position", positionHolder);
      addUserInfo(
        "location",
        locationHolder.substring(0, nthIndex(locationHolder, ",", 2))
      );
      addUserInfo('instagram-handle', instagramHolder.replace('@', ''));
      addUserInfo('twitter-handle', twitterHolder.replace('@', ''));
      addUserInfo('preferred-email', preferredEmailHolder);
      addUserInfo('wildcard', wildcardHolder);
      setName(getUserInfo('name'));
      setSport(getUserInfo('sport'));
      setPosition(getUserInfo('position'));
      setLocation(getUserInfo('location'));
      setInstagram(getUserInfo('instagram-handle'));
      setTwitter(getUserInfo('twitter-handle'));
      setPreferredEmail(getUserInfo('preferred-email'));
      setWildcard(getUserInfo('wildcard'));
      await updateUserInfoDictInDB();
    }
  };

  const handleProfileBioSubmission = async () => {
    setBioModalOpen(false);
    addUserInfo('bio', bioHolder);
    setBio(getUserInfo('bio'));
    await updateUserInfoDictInDB();
  }

  //Finds the index of the second occurence of a character in a string
  function nthIndex(str, pat, n) {
    var L = str.length,
      i = -1;
    while (n-- && i++ < L) {
      i = str.indexOf(pat, i);
      if (i < 0) break;
    }
    if (i === -1) {
      return str.length;
    } else {
      return i;
    }
  }

  //Firebase DB Setter Calls

  const updateUserInfoDictInDB = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .collection("User Info")
      .doc("Profile Data")
      .set({
        userArray: getUserDict(),
      })
      .then(() => {
        console.warn("User added!");
      });
  };

  const setExperienceArrayDB = async () => {
    await firebase
      .firestore()
      .collection('Users')
      .doc(userUID)
      .collection('User Info')
      .doc('Experience Array')
      .set({
        experienceArray: getExperienceArray(),
      })
      .then(() => {
        console.warn('Exp Array Updated');
      });
  };

  const setAccomplishmentArrayDB = async () => {
    await firebase
      .firestore()
      .collection('Users')
      .doc(userUID)
      .collection('User Info')
      .doc('Accomplishment Array')
      .set({
        accomplishmentArray: getAccomplishmentArray(),
      })
      .then(() => {
        console.warn('Accomplishment Array Updated');
      });
  };

  const setMeasurableArrayDB = async () => {
    await firebase
      .firestore()
      .collection('Users')
      .doc(userUID)
      .collection('User Info')
      .doc('Measurable Array')
      .set({
        measurableArray: getMeasurableArray(),
      })
      .then(() => {
        console.warn('Measurable Array Updated');
      });
  };

  const [showMore, setShowMore] = useState(false);
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

  return (
    <div className="profileScreenContainer">
      <div className="profileContentContainer">
        <div className="createScreenProfileHeader">
          <div className="topRightIconsContainer">
            {showLinkCopiedMessage && (
              <div className="linkCopiedMessage">
                <p>Copied!</p>
                <MdClose
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowLinkCopiedMessage(false)}
                  size={22}
                  color={"black"}
                />
              </div>
            )}
            <HiOutlinePencil
              className="topRightIconItem"
              onClick={() => setProfileEditModalOpen(true)}
              size={25}
              color={"black"}
            />
            <MdContentCopy
              className="topRightIconItem"
              onClick={
                getUserInfo("custom-url-created")
                  ? () => {
                      copyToClipboard();
                    }
                  : () => {
                      setCopyUrlModalOpen(true);
                    }
              }
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
                uploader(e);
              }}
              style={{ display: 'none', outline: 'none', border: 'none' }}
            />
            <button
              type="button"
              onClick={() => profileImageUploadClick()}
              style={{
                outline: 'none',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              {uploading ? (
                <img className="createScreenProfileImage" src={loadingGIF} />
              ) : (
                <img
                  className="createScreenProfileImage"
                  src={profileImage}
                  // alt={'Unable to load profile image'}
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
              <h3 className="createScreenLocationText">{location}</h3>
            </div>

            <div className="createScreenSocialIconsRow">
              {instagram && (
                <FaInstagram
                  className="createScreenSocialIcon"
                  onClick={() =>
                    // window.location.replace("www.instagram.com/" + instagram)
                    {
                      // mixpanel.track(
                      //   'Profile Icons Pressed by External Visitor',
                      //   { 'Profile Icon': 'Instagram' }
                      // );
                      window.open('https://instagram.com/' + instagram);
                    }
                  }
                  size={25}
                  color={'#E1306C'}
                />
              )}

              {twitter && (
                <FaTwitter
                  className="createScreenSocialIcon"
                  onClick={() =>
                    // window.location.replace("www.instagram.com/" + instagram)
                    {
                      // mixpanel.track(
                      //   'Profile Icons Pressed by External Visitor',
                      //   { 'Profile Icon': 'Twitter' }
                      // );
                      window.open('https://twitter.com/' + twitter);
                    }
                  }
                  size={25}
                  color={'#1DA1F2'}
                />
              )}

              {preferredEmail && (
                <MdMail
                  className="createScreenSocialIcon"
                  onClick={() => {
                    // mixpanel.track(
                    //   'Profile Icons Pressed by External Visitor',
                    //   { 'Profile Icon': 'Email' }
                    // );
                    window.open('mailto:' + preferredEmail);
                  }}
                  size={25}
                  color={'#5D4D4A'}
                />
              )}
              {wildcard && (
                <BsLink45Deg
                  className="createScreenSocialIcon"
                  onClick={() => {
                    window.open(wildcard);
                  }}
                  // onClick={() => setWildcardLinkModalOpen(true)}
                  size={25}
                  color={'#ffae42'}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <p></p>
        </div>
        <div className="createScreenBioContainer">
          <div className="profileItemListHeaderContainer">
            <h1 className="createScreenProfileItemListHeader">Bio</h1>
            <HiOutlinePencil
              onClick={() => setBioModalOpen(true)}
              className="profileItemListAddIcons"
              size={25}
              color={'black'}
              style={{cursor: 'pointer'}}
            />
          </div>
          <hr
            className="createScreenComponentHeaderDivider"
            color="lightgrey"
            size="1"
          />
          {bio != "" && (
            <p style={{ whiteSpace: "pre-wrap" }}>
              {getBioSeeMoreSeeLess(bio)}
            </p>
          )}
        </div>
        <VideoList mediaArray={thisMediaArray} refresh={refreshKey} />
        <div className="createScreenProfileItemListContainer">
          <div className="profileItemListHeaderContainer">
            <h1 className="createScreenProfileItemListHeader">Experiences</h1>
            <MdAdd
              style={{ cursor: 'pointer' }}
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
              style={{ cursor: 'pointer' }}
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
              style={{ cursor: 'pointer' }}
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
          appElement={document.getElementById("root") || undefined}
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
          appElement={document.getElementById("root") || undefined}
          isOpen={copyUrlModalOpen}
          onRequestClose={() => setCopyUrlModalOpen(false)}
          className="copyUrlModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div className="modalHeaderContainer">
            <p className="copyUrlModalTitle">
              Congrats on Creating Your Spogo Profile!
            </p>
            <MdClose
              className="closeIconCopyModal"
              onClick={() => setCopyUrlModalOpen(false)}
              style={{ cursor: "pointer" }}
              size={20}
              color={"grey"}
            />
          </div>
          <p className="copyUrlModalTaglineText">
            Choose your custom url below.
          </p>
          <div className="copyUrlTextInputContainer">
            <p className="copyUrlSpogoText">spogo.us/me/</p>
            <input
              required
              className="copyUrlModalTextInputItem"
              type="name"
              maxLength="100"
              onChange={(text) => {
                setUsername(text.target.value);
                setInvalidUsername(false);
              }}
            />
          </div>
          {invalidUsername && (
            <h1 className="createScreenInvalidText">
              Sorry, this username is already taken
            </h1>
          )}
          <div>
            <button
              onClick={() => {
                copyToClipboard();
                setCopyCustomUrlButtonText('Link has been copied!');
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
          appElement={document.getElementById("root") || undefined}
          isOpen={profileEditModalOpen}
          onRequestClose={() => setProfileEditModalOpen(false)}
          onAfterOpen={() => {
            setNameHolder(name);
            setSportHolder(sport);
            //For some reason sport isn't set yet here so have to use sport holder value
            let sportHolderValue = sport;
            let sportSelectorIndex = getSportIndex(sportHolderValue);
            console.log(sportSelectorIndex);
            if (sportSelectorIndex === 13) {
              setSportHolder("Other");
              setOtherSportHolder(sport);
            }
            document.getElementById("profileEditModalSportSelect").value =
              sportSelectorIndex;
            setPositionHolder(position);
            setLocationHolder(location);
            setInstagramHolder(instagram);
            setTwitterHolder(twitter);
            setPreferredEmailHolder(preferredEmail);
            setWildcardHolder(wildcard);
          }}
          className="profileEditModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div className="modalHeaderContainer">
            <p>Edit Profile</p>
            <MdClose
              style={{ cursor: "pointer" }}
              onClick={() => setProfileEditModalOpen(false)}
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
              value={nameHolder}
              onChange={(text) => {
                setNameHolder(text.target.value);
                setInvalidNameHolder(false);
              }}
            />
            {invalidNameHolder && (
              <h1 className="createScreenInvalidText">Name is required</h1>
            )}
            <div className="editModalSportPositionRowContainer">
              <div className="editModalSportPositionRowItemsContainer">
                <p className="textInputHeaders">Sport</p>
                <select
                  className="modalTextInputItems"
                  id={"profileEditModalSportSelect"}
                  onChange={(event) => {
                    setInvalidSportHolder(false);
                    setSportHolder(
                      event.target.options[event.target.selectedIndex].text
                    );
                  }}
                >
                  <option selected hidden>
                    Sport
                  </option>
                  <option value="0">Football</option>
                  <option value="1">Basketball</option>
                  <option value="2">Soccer</option>
                  <option value="3">Baseball</option>
                  <option value="4">Lacrosse</option>
                  <option value="5">Tennis</option>
                  <option value="6">Swimming</option>
                  <option value="7">Softball</option>
                  <option value="8">Track and Field</option>
                  <option value="9">Hockey</option>
                  <option value="10">Golf</option>
                  <option value="11">Rowing</option>
                  <option value="12">Volleyball</option>
                  <option value="13">Other</option>
                </select>
                {invalidSportHolder && (
                  <h1 className="createScreenInvalidText">
                    You must select a sport or pick other
                  </h1>
                )}
              </div>
              <div style={{ width: 30 }}></div>
              {sportHolder === "Other" && (
                <>
                  <div className="editModalSportPositionRowItemsContainer">
                    <p className="textInputHeaders">Sport</p>
                    <input
                      required
                      className="modalTextInputItems"
                      placeholder="Ex: Badminton, Gymnastics, ESports"
                      type="position"
                      maxLength="100"
                      value={otherSportHolder}
                      onChange={(text) => {
                        setOtherSportHolder(text.target.value);
                        setInvalidSportHolder(false);
                      }}
                    />
                  </div>
                  <div style={{ width: 30 }}></div>
                </>
              )}
              <div className="editModalSportPositionRowItemsContainer">
                <p className="textInputHeaders">Position</p>
                <input
                  required
                  className="modalTextInputItems"
                  placeholder="Ex: QB, PG, CM"
                  type="position"
                  maxLength="100"
                  value={positionHolder}
                  onChange={(text) => {
                    setPositionHolder(text.target.value);
                  }}
                />
              </div>
            </div>
            <p className="textInputHeaders">Location</p>
            <PlacesAutocomplete
              value={locationHolder}
              onChange={setLocationHolder}
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
                      className: 'modalTextInputItems',
                      placeholder: 'Ex: Seattle, WA',
                    })}
                  />

                  <div>
                    {suggestions.map((suggestion) => {
                      const style = {
                        fontWeight: suggestion.active ? "bold" : "400",
                        cursor: "pointer",
                        fontSize: suggestion.active ? 13.5 : 13,
                        fontFamily: "Open Sans",
                        marginTop: 9,
                        marginBottom: 9,
                        marginLeft: 5,
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
            {invalidLocationHolder && (
              <h1 className="createScreenInvalidText">Location is required</h1>
            )}
            <p className="textInputHeaders">Instagram</p>
            <input
              required
              className="modalTextInputItems"
              type="instagram"
              maxLength="100"
              value={instagramHolder}
              onChange={(text) => {
                setInstagramHolder(text.target.value);
              }}
            />
            <p className="textInputHeaders">Twitter</p>
            <input
              required
              className="modalTextInputItems"
              type="twitter"
              maxLength="100"
              value={twitterHolder}
              onChange={(text) => {
                setTwitterHolder(text.target.value);
              }}
            />
            <p className="textInputHeaders">Preferred Email</p>
            <input
              required
              className="modalTextInputItems"
              type="email"
              maxLength="100"
              value={preferredEmailHolder}
              onChange={(text) => {
                setPreferredEmailHolder(text.target.value);
                setInvalidPreferredEmailHolder(false);
              }}
            />
            {invalidPreferredEmailHolder && (
              <h1 className="createScreenInvalidText">
                Preferred email is invalid
              </h1>
            )}
            <p className="textInputHeaders">Link</p>
            <input
              required
              className="modalTextInputItems"
              type="link"
              maxLength="100"
              value={wildcardHolder}
              onChange={(text) => {
                setWildcardHolder(text.target.value);
                setInvalidWildcardHolder(false);
              }}
            />
            {invalidWildcardHolder && (
              <h1 className="createScreenInvalidText">
                Link must start with https://
              </h1>
            )}
          </div>
          <div>
            <button
              className="addEditItemModalButton"
              type={'button'}
              onClick={() => handleProfileEditModalSubmission()}
            >
              Confirm
            </button>
          </div>
        </Modal>
        {/* Profile Edit Modal */}
        {/* Bio Modal */}
        <Modal
          appElement={document.getElementById("root") || undefined}
          isOpen={bioModalOpen}
          onRequestClose={() => setBioModalOpen(false)}
          onAfterOpen={() => setBioHolder(bio)}
          className="bioModal"
          overlayClassName="itemAddModalOverlay"
        >
          <form>
            <div className="modalHeaderContainer">
              <p>Edit Bio</p>
              <MdClose
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setBioHolder(bio);
                  setBioModalOpen(false);
                }}
                size={20}
                color={'grey'}
              />
            </div>
            <textarea
              style={{ resize: "none" }}
              className="modalTextInputItems"
              rows={5}
              name={"description"}
              value={bioHolder}
              onChange={(text) => {
                setBioHolder(text.target.value);
              }}
            />
            <button
              className="addEditItemModalButton"
              type={'button'}
              onClick={() => handleProfileBioSubmission()}
            >
              Confirm
            </button>
          </form>
        </Modal>

        {/* Experience Modal */}
        <Modal
          appElement={document.getElementById("root") || undefined}
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
            setEndDateBeforeStartDateError(false);
            setCurrentExperienceText("Currently doing this?");
            setCurrentExperience(false);
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
                  setCurrentExperienceText('Currently doing this?');
                  setCurrentExperience(false);
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
                  placeholder="Ex. Your Position, Student Athlete, etc"
                  type="text"
                  maxLength="100"
                  onChange={(text) => {
                    setExperienceTitleText(text.target.value);
                    setInvalidExperienceTitle(false);
                  }}
                />
                {invalidExperienceTitle && (
                  <h1 className="createScreenInvalidText">Title is required</h1>
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
                  <h1 className="createScreenInvalidText">Team is required</h1>
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
                          setExperienceStartMonth(
                            event.target.options[event.target.selectedIndex]
                              .text
                          );
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
                          setExperienceStartYear(
                            event.target.options[event.target.selectedIndex]
                              .text
                          );
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
                      <h1 className="createScreenInvalidText">
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
                              setEndDateBeforeStartDateError(false);
                              setExperienceEndMonth(
                                event.target.options[event.target.selectedIndex]
                                  .text
                              );
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
                              setEndDateBeforeStartDateError(false);
                              setExperienceEndYear(
                                event.target.options[event.target.selectedIndex]
                                  .text
                              );
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
                      <h1
                        className="createScreenInvalidText"
                        style={{ marginBottom: 5 }}
                      >
                        End month and year is required
                      </h1>
                    )}
                    {endDateBeforeStartDateError && (
                      <h1
                        className="createScreenInvalidText"
                        style={{ marginBottom: 5 }}
                      >
                        End date must come after start date
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
          appElement={document.getElementById("root") || undefined}
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
                  placeholder="Ex: MVP, State Title, Student Athlete Award"
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
                  <h1 className="createScreenInvalidText">Title is required</h1>
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
                          setAccomplishmentMonthReceived(
                            event.target.options[event.target.selectedIndex]
                              .text
                          );
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
                          setAccomplishmentYearReceived(
                            event.target.options[event.target.selectedIndex]
                              .text
                          );
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
                      <h1 className="createScreenInvalidText">
                        Month and year received is required
                      </h1>
                    )}
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
          appElement={document.getElementById("root") || undefined}
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
                  <h1 className="createScreenInvalidText">Title is required</h1>
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
                  <h1 className="createScreenInvalidText">Value is required</h1>
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
          appElement={document.getElementById("root") || undefined}
          isOpen={showLoadingModal}
          className="loadingModal"
          overlayClassName="itemAddModalOverlay"
        >
          <div
            style={{
              width: '100vw',
              height: '100vh',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img src={loadingGIF} />
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
