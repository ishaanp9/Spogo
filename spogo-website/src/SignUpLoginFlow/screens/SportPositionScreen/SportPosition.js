import React, { useEffect, useState } from "react";
import WebFont from "webfontloader";
import "./SportPosition.css";
import { Link, useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { getUserDict, addUserInfo, getUserInfo, setUserDict } from "../../../UserData";
import firebase from "../../../firebase";

const SportPosition = (props) => {
  let userUID = props.userUID;
  const [userName, setUserName] = useState(getUserInfo("name"));
  const [signUpFinished, setSignUpFinished] = useState(getUserInfo("sign-up-finished"));
  const [sport, setSport] = useState("");
  const [invalidSport, setInvalidSport] = useState("");
  const [positionOne, setPositionOne] = useState("");
  const [positionTwo, setPositionTwo] = useState("");
  // const [positionText, setPositionText] = useState("");
  const [invalidPosition, setInvalidPosition] = useState("");
  let history = useHistory();

  useEffect(async () => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Open Sans", "Public Sans"],
      },
    });
    if (
      getUserInfo("name") === null ||
      getUserInfo("name") === undefined ||
      getUserInfo("email") === null ||
      getUserInfo("email") === undefined
    ) {
      await getUserInfoDictFromDB();
      setUserName(getUserInfo("name"))
      setSignUpFinished(getUserInfo("sign-up-finished"))
      console.log(getUserInfo("name"))
      console.log(getUserInfo("email"))
    }
  }, []);

  const getUserInfoDictFromDB = async () => {
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
  };

  const [positionIcon, setPositionIcon] = useState("BsPlus");
  const [positionIconText, setPositionIconText] = useState("Add a Position");

  const onIconPressed = () => {
    if (positionIcon === "BsPlus") {
      setPositionIcon("BsMinus");
      setPositionIconText("Remove a Position");
    }
    if (positionIcon === "BsMinus") {
      setPositionIcon("BsPlus");
      setPositionIconText("Add a Position");
    }
  };

  const handleSubmission = () => {
    let validSubmission = true;
    let positionText;
    if (sport === "") {
      setInvalidSport(true);
      validSubmission = false;
    } else {
    }
    if (positionOne === "" && positionTwo === "") {
      setInvalidPosition(true);
      validSubmission = false;
    } else {
      if (positionOne != "" && positionTwo === "") {
        positionText = positionOne;
      } else if (positionOne === "" && positionTwo != "") {
        positionText = positionTwo;
      } else {
        positionText = positionOne + ", " + positionTwo;
      }
    }
    if (validSubmission) {
      addUserInfo("sport", sport);
      addUserInfo("position", positionText);
      console.log(getUserDict());
      history.push("/auth/sign-up/socials");
    }
  };

  if (signUpFinished === true) {
    history.push('/create')
  }

  return (
    <div className="sportPositionScreenContainer">
      <div className="sportPositionContainer">
        <p className="sportPositionFormHeader">
          Hello
          {userName != null ? " " + userName : null}
          ! Welcome to Spogo!
        </p>
        <p className="sportPositionHeadlineHeader">
          Let's start creating your athletic profile.
        </p>
        <form>
          <div className="sportPositionInputForms">
            <p
              className="sportPositionTextInputHeader"
              style={{ marginTop: "8%" }}
            >
              Sport
            </p>
            <select
              className="sportPositionTextInput"
              onChange={(event) => {
                setInvalidSport(false);
                setSport(event.target.value);
              }}
            >
              <option selected hidden>
                Sport
              </option>
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
            {invalidSport && (
              <h1 className="invalidText">Please select a sport</h1>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="sportPositionTextInputHeader">Position</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p
                  className="sportPositionTextInputHeader"
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    onIconPressed();
                  }}
                >
                  {positionIconText}
                </p>
                {positionIcon === "BsMinus" ? (
                  <BiMinus
                    onClick={() => {
                      // setPositionIcon("BsPlus");
                      onIconPressed();
                    }}
                    style={{ marginBottom: 5, cursor: "pointer" }}
                    size={20}
                    color={"black"}
                  />
                ) : (
                  <BsPlus
                    onClick={() => {
                      // setPositionIcon("BiMinus");
                      onIconPressed();
                    }}
                    style={{ marginBottom: 5, cursor: "pointer" }}
                    size={20}
                    color={"black"}
                  />
                )}
              </div>
            </div>
            <input
              className="sportPositionTextInput"
              placeholder={"Ex: Quarterback, Point Guard, Midfielder"}
              type="text"
              id="Position"
              value={positionOne}
              onChange={(text) => {
                setPositionOne(text.target.value);
                setInvalidPosition(false);
              }}
            />
            {positionIcon === "BsMinus" ? (
              <input
                className="sportPositionTextInput"
                placeholder={"Ex: Linebacker, Shooting Guard, Striker"}
                type="text"
                id="Position"
                value={positionTwo}
                onChange={(text) => {
                  setPositionTwo(text.target.value);
                  setInvalidPosition(false);
                }}
              />
            ) : null}
            {invalidPosition && (
              <h1 className="invalidText">
                Please enter a position or choose "I don't have a position"
              </h1>
            )}
            {positionIcon === "BsPlus" ? (
              <p className="sportsNoPositionText">I don't have a position.</p>
            ) : null}
            {/* <Link
              to={"/auth/sign-up/socials"}
              className="sportPositionNextButton"
            > */}
            <button
              onClick={() => {
                handleSubmission();
              }}
              className="sportPositionNextButton"
              type="button"
            >
              Next
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SportPosition;
