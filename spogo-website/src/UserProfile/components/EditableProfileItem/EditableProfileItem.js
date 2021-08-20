import React, { useEffect, useState, useContext } from "react";
import "./EditableProfileItem.css";
import CrownIcon from "mdi-react/CrownIcon";
import TrophyIcon from "mdi-react/TrophyIcon";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import RocketLaunchIcon from "mdi-react/RocketLaunchIcon";
import { Link, useHistory } from "react-router-dom";
import { MixpanelConsumer } from "react-mixpanel";
import {
  getExperienceArray,
  getAccomplishmentArray,
  getMeasurableArray,
  editAccomplishmentItem,
  editExperienceItem,
  deleteExperienceItem,
  deleteAccomplishmentItem,
  deleteMeasurableItem,
} from "../../../UserData";
import WebFont from "webfontloader";
import Modal from "react-modal";
import { editMeasurableItem } from "../../../UserData";
import firebase from "../../../firebase";
import { UserDataContext } from "../../../App";
import { ExperienceDescriptionModal, AccomplishmentDescriptionModal } from "../../../UserProfile/screens/CreateDescriptionScreen/CreateDescriptionScreen";

const EditableProfileItem = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  let icon = props.iconName;
  let color = props.color;
  let title = props.title;
  let team = props.team;
  let time = props.time;
  let description = props.description;
  let idNum = props.idNum;
  let userUID = getUserUID();

  let history = useHistory();

  const [iconToHeaderName, setIconToHeaderName] = useState("");
  const [specificItemArray, setSpecificArray] = useState([]);

  // Experience States
  let experienceArray = getExperienceArray();
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
  let accomplishmentArray = getAccomplishmentArray();
  const [accomplishmentModalOpen, setAccomplishmentModalOpen] = useState(false);
  const [accomplishmentTitleText, setAccomplishmentTitleText] = useState("");
  const [accomplishmentMonthReceived, setAccomplishmentMonthReceived] =
    useState("");
  const [accomplishmentYearReceived, setAccomplishmentYearReceived] =
    useState("");
  const [accomplishmentDescriptionText, setAccomplishmentDescriptionText] =
    useState("");

  // Measurable States
  let measurableArray = getMeasurableArray();
  const [measurableModalOpen, setMeasurableModalOpen] = useState(false);
  const [measurableTitleText, setMeasurableTitleText] = useState("");
  const [measurableValueText, setMeasurableValueText] = useState("");

  const getSpecificArray = () => {
    if (icon === "crown") {
      setSpecificArray(getExperienceArray());
    } else if (icon === "trophy") {
      setSpecificArray(getAccomplishmentArray());
    } else {
      setSpecificArray(getMeasurableArray());
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Poppins"],
      },
    });
    setIconType();
  }, []);

  function setIconType() {
    if (icon === "trophy") {
      setIconToHeaderName("Accomplishment");
    } else if (icon === "crown") {
      setIconToHeaderName("Experience");
    } else {
      setIconToHeaderName("Measurable");
    }
  }

  useEffect(() => {
    findSize();
    getSpecificArray();
  }, []);

  const ItemIcon = (props) => {
    let iconType = props.iconType;
    if (iconType === "trophy") {
      // setIconToHeaderName("Accomplishment");
      return <TrophyIcon color={color} size={23} />;
    } else if (iconType === "crown") {
      // setIconToHeaderName("Experience");
      return <CrownIcon color={color} size={23} />;
    } else {
      // setIconToHeaderName("Measurable");
      return <RocketLaunchIcon color={color} size={23} />;
    }
  };

  const [iconSize, setIconSize] = useState(20);

  const findSize = () => {
    if (window.innerWidth < 1200) {
      setIconSize(22);
    } else {
      setIconSize(25);
    }
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
      experienceTitleText != "" &&
      experienceTeamText != "" &&
      experienceStartMonth != "" &&
      experienceStartYear != "" &&
      ((experienceEndMonth != "" && experienceEndYear != "") ||
        currentExperienceText === "Not currently doing this?")
    ) {
      {
        let startDateValue = 0;
        let endDateValue = 0;
        let endDateAfterStartDate = true;
        if (currentExperienceText != "Not currently doing this?") {
          startDateValue += parseInt(experienceStartYear, 10);
          startDateValue += getMonthIndex(experienceStartMonth) / 13;
          endDateValue += parseInt(experienceEndYear, 10);
          endDateValue += getMonthIndex(experienceEndMonth) / 13;
          console.log(startDateValue);
          console.log(endDateValue);
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
          editExperienceItem(
            experienceTitleText,
            experienceTeamText,
            experienceDurationText,
            experienceDescriptionText,
            idNum
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
          props.callbackReloadList();
          await setExperienceArrayDB();
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

  const toggleCurrentExperienceText = () => {
    if (currentExperienceText === "Currently doing this?") {
      setCurrentExperienceText("Not currently doing this?");
    } else {
      setCurrentExperienceText("Currently doing this?");
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
    console.log("Got Here");
    if (
      accomplishmentTitleText != "" &&
      accomplishmentMonthReceived != "" &&
      accomplishmentYearReceived != ""
    ) {
      let accomplishmentDateReceivedText =
        accomplishmentMonthReceived + ", " + accomplishmentYearReceived;
      setAccomplishmentModalOpen(false);
      editAccomplishmentItem(
        accomplishmentTitleText,
        accomplishmentDateReceivedText,
        accomplishmentDescriptionText,
        idNum
      );
      setAccomplishmentTitleText("");
      setAccomplishmentDescriptionText("");
      setAccomplishmentMonthReceived("");
      setAccomplishmentYearReceived("");
      setInvalidAccomplishmentTitle(false);
      setInvalidAccomplishmentDateReceived(false);
      props.callbackReloadList();
      await setAccomplishmentArrayDB();
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
      editMeasurableItem(measurableTitleText, measurableValueText, idNum);
      setMeasurableTitleText("");
      setMeasurableValueText("");
      setInvalidMeasurableTitle(false);
      setInvalidMeasurableValue(false);
      props.callbackReloadList();
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

  //Firebase DB Setter Calls
  const setExperienceArrayDB = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .collection("User Info")
      .doc("Experience Array")
      .set({
        experienceArray: getExperienceArray(),
      })
      .then(() => {
        console.warn("Exp Array Updated");
      });
  };

  const setAccomplishmentArrayDB = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .collection("User Info")
      .doc("Accomplishment Array")
      .set({
        accomplishmentArray: getAccomplishmentArray(),
      })
      .then(() => {
        console.warn("Accomplishment Array Updated");
      });
  };

  const setMeasurableArrayDB = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .collection("User Info")
      .doc("Measurable Array")
      .set({
        measurableArray: getMeasurableArray(),
      })
      .then(() => {
        console.warn("Measurable Array Updated");
      });
  };

  const [showMore, setShowMore] = useState(false);
  const descriptionSeeMoreSeeLess = (text, platform) => {
    if (platform === "phone") {
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
              <span className="seeMoreButton" onClick={() => setShowMore(true)}>
                {" "}
                ...See More
              </span>
            </p>
          </div>
        );
      }
    } else {
      if (text.length <= 350) {
        return text;
      }
      if (text.length > 350 && showMore) {
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
      if (text.length > 350) {
        return (
          <div className="seeMoreBio">
            <p>
              {text.slice(0, 350)}
              <span className="seeMoreButton" onClick={() => setShowMore(true)}>
                {" "}
                ...See More
              </span>
            </p>
          </div>
        );
      }
    }
  };

  const handleEditPress = () => {
    if (icon === "crown") {
      setExperienceModalOpen(true);
    } else if (icon === "trophy") {
      setAccomplishmentModalOpen(true);
    } else {
      setMeasurableModalOpen(true);
    }
  };

  const handleDeletePress = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this item? You cannot undo this."
      )
    ) {
      if (icon === "crown") {
        deleteExperienceItem(idNum);
        props.callbackReloadList();
        await setExperienceArrayDB();
      } else if (icon === "trophy") {
        deleteAccomplishmentItem(idNum);
        props.callbackReloadList();
        await setAccomplishmentArrayDB();
      } else {
        deleteMeasurableItem(idNum);
        props.callbackReloadList();
        await setMeasurableArrayDB();
      }
    } else {
      //nothing
    }
  };

  const getMonthIndex = (month) => {
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
    let monthIndexNum = -1;
    for (let i = 0; i < monthNames.length; i++) {
      if (month === monthNames[i]) {
        monthIndexNum = i;
      }
    }
    return monthIndexNum;
  };

  const getYearIndex = (year) => {
    let yearArray = [
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
      "2009",
      "2008",
      "2007",
      "2006",
      "2005",
      "2004",
      "2003",
      "2002",
      "2001",
      "2000",
    ];
    let yearIndexNum = -1;
    for (let i = 0; i < yearArray.length; i++) {
      if (year === yearArray[i]) {
        yearIndexNum = i;
      }
    }
    return yearIndexNum;
  };

  const [experienceDescriptionModalOpen, setExperienceDescriptionModalOpen] =
    useState(false);
  const [
    experienceDescriptionModalRefresh,
    setExperienceDescriptionModalRefresh,
  ] = useState(false);

  const [accomplishmentDescriptionModalOpen, setAccomplishmentDescriptionModalOpen] = useState(false);
  const [accomplishmentDescriptionModalRefresh, setAccomplishmentDescriptionModalRefresh] = useState(false);

  const handleItemClick = (iconType) => {
    console.log(iconType)
    if (iconType === 'crown') {
      setExperienceDescriptionModalRefresh(!experienceDescriptionModalRefresh);
      setExperienceDescriptionModalOpen(true);
    } else if (iconType === 'trophy') {
      setAccomplishmentDescriptionModalOpen(true);
      setAccomplishmentDescriptionModalRefresh(!accomplishmentDescriptionModalRefresh);
    }
  }

  return (
    <MixpanelConsumer>
      {(mixpanel) => (
        <>
          {window.innerWidth < 600 ? (
            <div className="editableItemContainer">
              <div className="editableItemIconContainer">
                <ItemIcon iconType={icon} />
              </div>
              <div className="itemTextButtonsDividerContainer">
                <div className="itemTextButtonsContainer">
                  <div
                    className="editableItemTextContainer"
                    onClick={() => handleItemClick(icon)}
                  >
                    <h1>{title}</h1>
                    {team != undefined && team != null && team != "" && (
                      <h2>{team}</h2>
                    )}
                    <h3>{time}</h3>
                    <h4>{description}</h4>
                  </div>
                  {/* </Link> */}
                  <div className="editDeleteButtonsContainer">
                    <MdEdit
                      size={25}
                      color={"#B2BEB5"}
                      className="editDeleteButton"
                      onClick={() => handleEditPress()}
                    />
                    <MdDelete
                      size={25}
                      color={"#C41E3A"}
                      className="editDeleteButton"
                      onClick={() => handleDeletePress()}
                    />
                  </div>
                </div>
                <hr size="1" color="lightgrey" className="Divider" />
              </div>
            </div>
          ) : (
            // </Link>
            <div
              className="editableItemContainer"
              onClick={() =>
                mixpanel.track("Specific Item Type Pressed", {
                  Item: iconToHeaderName,
                })
              }
            >
              <div className="editableItemIconContainer">
                <ItemIcon iconType={icon} />
              </div>
              <div className="itemTextButtonsDividerContainer">
                <div className="itemTextButtonsContainer">
                  <div className="editableItemTextContainer">
                    <h1>{title}</h1>
                    {team != undefined && team != null && team != "" && (
                      <h2>{team}</h2>
                    )}
                    <h3>{time}</h3>
                    {description ? (
                      <h4>
                        {descriptionSeeMoreSeeLess(description, "website")}
                      </h4>
                    ) : null}
                  </div>
                  <div className="editDeleteButtonsContainer">
                    <MdEdit
                      size={25}
                      color={"#B2BEB5"}
                      className="editDeleteButton"
                      onClick={() => handleEditPress()}
                    />
                    <MdDelete
                      size={25}
                      color={"#C41E3A"}
                      className="editDeleteButton"
                      onClick={() => handleDeletePress()}
                    />
                  </div>
                </div>
                <hr size="1" color="lightgrey" className="Divider" />
              </div>
            </div>
          )}
          {/* Item Edit Modal */}
          {/* Item Edit Modal */}
          {/* Item Edit Modal */}
          {/* Item Edit Modal */}

          {/* Experience Modal */}
          <Modal
            appElement={document.getElementById("root") || undefined}
            isOpen={experienceModalOpen}
            onRequestClose={() => {
              setExperienceModalOpen(false);
            }}
            onAfterOpen={() => {
              //Handles all text inputs and selects when the edit modal is opened
              setExperienceTitleText(experienceArray[idNum].title);
              setExperienceTeamText(experienceArray[idNum].team);
              setExperienceDescriptionText(experienceArray[idNum].description);
              let experienceDurationText = experienceArray[idNum].duration;
              let expStartDateText = experienceDurationText.substring(
                0,
                experienceDurationText.indexOf("-") - 1
              );
              let expEndDateText = experienceDurationText.substring(
                experienceDurationText.indexOf("-") + 2
              );
              setExperienceStartMonth(
                expStartDateText.substring(0, expStartDateText.indexOf(","))
              );
              setExperienceStartYear(
                expStartDateText.substring(expStartDateText.indexOf(",") + 2)
              );
              let expStartMonthIndex = getMonthIndex(
                expStartDateText.substring(0, expStartDateText.indexOf(","))
              );
              let expStartYearIndex = getYearIndex(
                expStartDateText.substring(expStartDateText.indexOf(",") + 2)
              );
              document.getElementById("experienceStartMonthSelector").value =
                expStartMonthIndex + 1;
              document.getElementById("experienceStartYearSelector").value =
                expStartYearIndex + 1;
              if (expEndDateText === "Present") {
                setCurrentExperience(true);
                setCurrentExperienceText("Not currently doing this?");
              } else {
                // try {
                setExperienceEndMonth(
                  expEndDateText.substring(0, expEndDateText.indexOf(","))
                );
                setExperienceEndYear(
                  expEndDateText.substring(expEndDateText.indexOf(",") + 2)
                );
                let expEndMonthIndex = getMonthIndex(
                  expEndDateText.substring(0, expEndDateText.indexOf(","))
                );
                let expEndYearIndex = getYearIndex(
                  expEndDateText.substring(expEndDateText.indexOf(",") + 2)
                );
                document.getElementById("experienceEndMonthSelector").value =
                  expEndMonthIndex + 1;
                document.getElementById("experienceEndYearSelector").value =
                  expEndYearIndex + 1;
              }
            }}
            className="experienceModal"
            overlayClassName="itemAddModalOverlay"
          >
            <div className="expModalContainer">
              <div className="modalHeaderContainer">
                <p>Edit Experience</p>
                <MdClose
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setExperienceModalOpen(false);
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
                    placeholder="Ex. Your Position, Student Athlete, etc"
                    maxLength="100"
                    value={experienceTitleText}
                    onChange={(text) => {
                      setExperienceTitleText(text.target.value);
                      setInvalidExperienceTitle(false);
                    }}
                  />
                  {invalidExperienceTitle && (
                    <h1 className="createScreenInvalidText">
                      Title is required
                    </h1>
                  )}
                  <p className="textInputHeaders">Team</p>
                  <input
                    required
                    className="modalTextInputItems"
                    type="text"
                    maxLength="100"
                    value={experienceTeamText}
                    onChange={(text) => {
                      setExperienceTeamText(text.target.value);
                      setInvalidExperienceTeam(false);
                    }}
                  />
                  {invalidExperienceTeam && (
                    <h1 className="createScreenInvalidText">
                      Team is required
                    </h1>
                  )}
                  <div className="modalDatePickerContainer">
                    <div className="expModalDatePickerItemContainer">
                      <p className="textInputHeaders">Start Date</p>
                      <div className="datePickerRow">
                        <select
                          className="modalDatePicker"
                          required
                          id={"experienceStartMonthSelector"}
                          name={"experienceStartMonthSelector"}
                          onChange={(event) => {
                            setInvalidExperienceStartDate(false);
                            setExperienceStartMonth(
                              event.target.options[event.target.selectedIndex]
                                .text
                            );
                          }}
                        >
                          <option value="0" selected hidden>
                            Month
                          </option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                        <div className="datePickerRowMiddleDivider"></div>
                        <select
                          className="modalDatePicker"
                          required
                          id={"experienceStartYearSelector"}
                          name={"experienceStartYearSelector"}
                          onChange={(event) => {
                            setInvalidExperienceStartDate(false);
                            setExperienceStartYear(
                              event.target.options[event.target.selectedIndex]
                                .text
                            );
                          }}
                        >
                          <option selected hidden value="0">
                            Year
                          </option>
                          <option value="1">2021</option>
                          <option value="2">2020</option>
                          <option value="3">2019</option>
                          <option value="4">2018</option>
                          <option value="5">2017</option>
                          <option value="6">2016</option>
                          <option value="7">2015</option>
                          <option value="8">2014</option>
                          <option value="9">2013</option>
                          <option value="10">2012</option>
                          <option value="11">2011</option>
                          <option value="12">2010</option>
                          <option value="13">2009</option>
                          <option value="14">2008</option>
                          <option value="15">2007</option>
                          <option value="16">2006</option>
                          <option value="17">2005</option>
                          <option value="18">2004</option>
                          <option value="19">2003</option>
                          <option value="20">2002</option>
                          <option value="21">2001</option>
                          <option value="22">2000</option>
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
                              id={"experienceEndMonthSelector"}
                              name={"experienceEndMonthSelector"}
                              onChange={(event) => {
                                setInvalidExperienceEndDate(false);
                                setEndDateBeforeStartDateError(false);
                                setExperienceEndMonth(
                                  event.target.options[
                                    event.target.selectedIndex
                                  ].text
                                );
                              }}
                            >
                              <option value="0" selected hidden>
                                Month
                              </option>
                              <option value="1">January</option>
                              <option value="2">February</option>
                              <option value="3">March</option>
                              <option value="4">April</option>
                              <option value="5">May</option>
                              <option value="6">June</option>
                              <option value="7">July</option>
                              <option value="8">August</option>
                              <option value="9">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                            <div className="datePickerRowMiddleDivider"></div>
                            <select
                              className="modalDatePicker"
                              required
                              id={"experienceEndYearSelector"}
                              name={"experienceEndYearSelector"}
                              onChange={(event) => {
                                setInvalidExperienceEndDate(false);
                                setEndDateBeforeStartDateError(false);
                                setExperienceEndYear(
                                  event.target.options[
                                    event.target.selectedIndex
                                  ].text
                                );
                              }}
                            >
                              <option selected hidden value="0">
                                Year
                              </option>
                              <option value="1">2021</option>
                              <option value="2">2020</option>
                              <option value="3">2019</option>
                              <option value="4">2018</option>
                              <option value="5">2017</option>
                              <option value="6">2016</option>
                              <option value="7">2015</option>
                              <option value="8">2014</option>
                              <option value="9">2013</option>
                              <option value="10">2012</option>
                              <option value="11">2011</option>
                              <option value="12">2010</option>
                              <option value="13">2009</option>
                              <option value="14">2008</option>
                              <option value="15">2007</option>
                              <option value="16">2006</option>
                              <option value="17">2005</option>
                              <option value="18">2004</option>
                              <option value="19">2003</option>
                              <option value="20">2002</option>
                              <option value="21">2001</option>
                              <option value="22">2000</option>
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
                    value={experienceDescriptionText}
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
                  Confirm
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
              setAccomplishmentTitleText(accomplishmentArray[idNum].title);
              setAccomplishmentDescriptionText(
                accomplishmentArray[idNum].description
              );
              let accomplishmentDurationText =
                accomplishmentArray[idNum].duration;
              setAccomplishmentMonthReceived(
                accomplishmentDurationText.substring(
                  0,
                  accomplishmentDurationText.indexOf(",")
                )
              );
              setAccomplishmentYearReceived(
                getYearIndex(
                  accomplishmentDurationText.substring(
                    accomplishmentDurationText.indexOf(",") + 2
                  )
                )
              );
              setInvalidAccomplishmentTitle(false);
              setInvalidAccomplishmentDateReceived(false);
            }}
            onAfterOpen={() => {
              accomplishmentArray = getAccomplishmentArray();
              setAccomplishmentTitleText(accomplishmentArray[idNum].title);
              setAccomplishmentDescriptionText(
                accomplishmentArray[idNum].description
              );
              let accomplishmentDurationText =
                accomplishmentArray[idNum].duration;
              setAccomplishmentMonthReceived(
                accomplishmentDurationText.substring(
                  0,
                  accomplishmentDurationText.indexOf(",")
                )
              );
              setAccomplishmentYearReceived(
                accomplishmentDurationText.substring(
                  accomplishmentDurationText.indexOf(",") + 2
                )
              );
              let monthIndex = getMonthIndex(
                accomplishmentDurationText.substring(
                  0,
                  accomplishmentDurationText.indexOf(",")
                )
              );
              let yearIndex = getYearIndex(
                accomplishmentDurationText.substring(
                  accomplishmentDurationText.indexOf(",") + 2
                )
              );
              document.getElementById("accomplishmentYearSelector").value =
                yearIndex + 1;
              document.getElementById("accomplishmentMonthSelector").value =
                monthIndex + 1;
            }}
            className="accomplishmentModal"
            overlayClassName="itemAddModalOverlay"
          >
            <div>
              <div className="modalHeaderContainer">
                <p>Edit Accomplishment</p>
                <MdClose
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setAccomplishmentModalOpen(false);
                    setAccomplishmentTitleText(
                      accomplishmentArray[idNum].title
                    );
                    setAccomplishmentDescriptionText(
                      accomplishmentArray[idNum].description
                    );
                    let accomplishmentDurationText =
                      accomplishmentArray[idNum].duration;
                    setAccomplishmentMonthReceived(
                      accomplishmentDurationText.substring(
                        0,
                        accomplishmentDurationText.indexOf(",")
                      )
                    );
                    setAccomplishmentYearReceived(
                      getYearIndex(
                        accomplishmentDurationText.substring(
                          accomplishmentDurationText.indexOf(",") + 2
                        )
                      )
                    );
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
                    value={accomplishmentTitleText}
                    onChange={(text) => {
                      setAccomplishmentTitleText(text.target.value);
                      setInvalidAccomplishmentTitle(false);
                    }}
                  />
                  {invalidAccomplishmentTitle && (
                    <h1 className="createScreenInvalidText">
                      Title is required
                    </h1>
                  )}
                  <div className="modalDatePickerContainer">
                    <div className="accomplishmentMeasurableDatePickerItemContainer">
                      <p className="textInputHeaders">Date Received</p>
                      <div className="datePickerRow">
                        <select
                          className="modalDatePicker"
                          required
                          id={"accomplishmentMonthSelector"}
                          name={"accomplishmentMonthSelector"}
                          onChange={(event) => {
                            setInvalidAccomplishmentDateReceived(false);
                            setAccomplishmentMonthReceived(
                              event.target.options[event.target.selectedIndex]
                                .text
                            );
                          }}
                        >
                          <option value="0" selected hidden>
                            Month
                          </option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                        <div className="datePickerRowMiddleDivider"></div>
                        <select
                          className="modalDatePicker"
                          required
                          id={"accomplishmentYearSelector"}
                          name={"accomplishmentYearSelector"}
                          onChange={(event) => {
                            setInvalidAccomplishmentDateReceived(false);
                            setAccomplishmentYearReceived(
                              event.target.options[event.target.selectedIndex]
                                .text
                            );
                          }}
                        >
                          <option selected hidden value="0">
                            Year
                          </option>
                          <option value="1">2021</option>
                          <option value="2">2020</option>
                          <option value="3">2019</option>
                          <option value="4">2018</option>
                          <option value="5">2017</option>
                          <option value="6">2016</option>
                          <option value="7">2015</option>
                          <option value="8">2014</option>
                          <option value="9">2013</option>
                          <option value="10">2012</option>
                          <option value="11">2011</option>
                          <option value="12">2010</option>
                          <option value="13">2009</option>
                          <option value="14">2008</option>
                          <option value="15">2007</option>
                          <option value="16">2006</option>
                          <option value="17">2005</option>
                          <option value="18">2004</option>
                          <option value="19">2003</option>
                          <option value="20">2002</option>
                          <option value="21">2001</option>
                          <option value="22">2000</option>
                        </select>
                      </div>
                      {invalidAccomplishmentDateReceived && (
                        <h1 className="createScreenInvalidText">
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
                    value={accomplishmentDescriptionText}
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
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
          {/* Accomplishment Modal */}

          {/* Experience Description Modal*/}
          <ExperienceDescriptionModal
            modalOpen={experienceDescriptionModalOpen}
            refresh={experienceDescriptionModalRefresh}
          />
          {/* Experience Description Modal*/}

          {/* Accomplishment Description Modal*/}
          <AccomplishmentDescriptionModal
            modalOpen={accomplishmentDescriptionModalOpen}
            refresh={accomplishmentDescriptionModalRefresh}
          />
          {/* Accomplishment Description Modal*/}

          {/* Measurable Modal */}
          <Modal
            appElement={document.getElementById("root") || undefined}
            isOpen={measurableModalOpen}
            onRequestClose={() => {
              setMeasurableModalOpen(false);
              setMeasurableTitleText(measurableArray[idNum].title);
              setMeasurableValueText(measurableArray[idNum].value);
              setInvalidMeasurableTitle(false);
              setInvalidMeasurableValue(false);
            }}
            onAfterOpen={() => {
              measurableArray = getMeasurableArray();
              setMeasurableTitleText(measurableArray[idNum].title);
              setMeasurableValueText(measurableArray[idNum].value);
              setInvalidMeasurableTitle(false);
              setInvalidMeasurableValue(false);
            }}
            className="measurableModal"
            overlayClassName="itemAddModalOverlay"
          >
            <div>
              <div className="modalHeaderContainer">
                <p>Edit Measurable</p>
                <MdClose
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMeasurableModalOpen(false);
                    setMeasurableTitleText(measurableArray[idNum].title);
                    setMeasurableValueText(measurableArray[idNum].value);
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
                    className="modalTextInputItems"
                    type="text"
                    maxLength="100"
                    value={measurableTitleText}
                    onChange={(text) => {
                      setMeasurableTitleText(text.target.value);
                      setInvalidMeasurableTitle(false);
                    }}
                  />
                  {invalidMeasurableTitle && (
                    <h1 className="createScreenInvalidText">
                      Title is required
                    </h1>
                  )}
                  <p className="textInputHeaders">Value</p>
                  <input
                    className="modalTextInputItems"
                    rows={5}
                    name={"value"}
                    value={measurableValueText}
                    onChange={(text) => {
                      setMeasurableValueText(text.target.value);
                      setInvalidMeasurableValue(false);
                    }}
                  />
                  {invalidMeasurableValue && (
                    <h1 className="createScreenInvalidText">
                      Value is required
                    </h1>
                  )}
                </form>
              </div>
              <div>
                <button
                  className="addEditItemModalButton"
                  type={"button"}
                  onClick={() => checkValidMeasurable()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
          {/* Measurable Modal */}
          {/* Item Edit Modal */}
          {/* Item Edit Modal */}
          {/* Item Edit Modal */}
          {/* Item Edit Modal */}
        </>
      )}
    </MixpanelConsumer>
  );
};

export default EditableProfileItem;
