import React, { useEffect, useState, useContext } from "react";
import WebFont from "webfontloader";
import "./SportPosition.css";
import { Link, useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import {
  getUserDict,
  addUserInfo,
  getUserInfo,
  setUserDict,
} from "../../../UserData";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import firebase from "../../../firebase";
import { MdAirlineSeatLegroomNormal } from "react-icons/md";
import { UserDataContext } from "../../../App";

const SportPosition = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  let userUID;
  const [userName, setUserName] = useState(getUserInfo("name"));
  const [signUpFinished, setSignUpFinished] = useState(
    getUserInfo("sign-up-finished")
  );
  const [sport, setSport] = useState("");
  const [otherSport, setOtherSport] = useState("");
  const [invalidSport, setInvalidSport] = useState("");
  const [invalidOtherSport, setInvalidOtherSport] = useState("")
  const [positionOne, setPositionOne] = useState("");
  const [positionTwo, setPositionTwo] = useState("");
  const [invalidPosition, setInvalidPosition] = useState("");

  let history = useHistory();
  const [noPosition, setNoPosition] = useState(false);

  useEffect(async () => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
    userUID = getUserUID();
    console.log(userUID)
    if (
      getUserInfo('name') === null ||
      getUserInfo('name') === undefined ||
      getUserInfo('email') === null ||
      getUserInfo('email') === undefined
    ) {
      await getUserInfoDictFromDB();
      setUserName(getUserInfo("name"));
      setSignUpFinished(getUserInfo("sign-up-finished"));
      console.log(getUserInfo("name"));
      console.log(getUserInfo("email"));
    }
  }, []);

  const getUserInfoDictFromDB = async () => {
    let dbPath = firebase
      .firestore()
      .collection('Users')
      .doc(userUID)
      .collection('User Info');
    let profileData = dbPath.doc('Profile Data');
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
        console.log('Error getting user info document:', error);
      });
  };

  const [positionIcon, setPositionIcon] = useState('BsPlus');
  const [positionIconText, setPositionIconText] = useState('Add a Position');

  const onIconPressed = () => {
    if (positionIcon === 'BsPlus') {
      setPositionIcon('BsMinus');
      setPositionIconText('Remove a Position');
    }
    if (positionIcon === 'BsMinus') {
      setPositionIcon('BsPlus');
      setPositionIconText('Add a Position');
    }
  };

  const handleSubmission = () => {
    let validSubmission = true;
    let positionText;
    if (location === '') {
      setInvalidLocation(true);
      validSubmission = false;
    }
    if (sport === '') {
      setInvalidSport(true);
      validSubmission = false;
    } else {
      if (sport === 'Other') {
        if (otherSport === '') {
          setInvalidOtherSport(true)
          validSubmission = false;
        }
      }
    }
    if (!noPosition) {
      if (positionOne === '' && positionTwo === '') {
        setInvalidPosition(true);
        validSubmission = false;
      } else {
        if (positionOne != '' && positionTwo === '') {
          positionText = positionOne;
        } else if (positionOne === '' && positionTwo != '') {
          positionText = positionTwo;
        } else {
          positionText = positionOne + ', ' + positionTwo;
        }
      }
    }
    
    if (validSubmission) {
      addUserInfo('location', location.substring(0, nthIndex(location, ',', 2)))
      if (sport === 'Other') {
        addUserInfo('sport', otherSport)
      } else {
        addUserInfo('sport', sport);
      }
      if (noPosition) {
        addUserInfo('position', '');
      } else {
        addUserInfo('position', positionText);
      }
      console.log(getUserDict());
      history.push('/auth/sign-up/socials');
    }
  };

  if (signUpFinished === true) {
    history.push("/create");
  }

  const [location, setLocation] = useState("");
  const [invalidLocation, setInvalidLocation] = useState(false);
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setInvalidLocation(false);
    setLocation(value);
  };

  //Finds the index of the second occurence of a character in a string
  function nthIndex(str, pat, n) {
    var L = str.length,
      i = -1;
    while (n-- && i++ < L) {
      i = str.indexOf(pat, i);
      if (i < 0) break;
    }
    if (i === -1) {
      return str.length
    } else {
      return i;
    }
  }

  const [havePositionText, setHavePositionText] = useState("I don't have a position")
  const handleNoPositionToggle = () => {
    if (noPosition) {
      setNoPosition(false)
      setHavePositionText("I don't have a position")
    } else {
      setNoPosition(true)
      setHavePositionText("I have a position")
    }
  }

  return (
    <div className="sportPositionScreenContainer">
      <div className="sportPositionContainer">
        <p className="sportPositionFormHeader">
          Hello
          {userName != null ? ' ' + userName : null}! Welcome to Spogo!
        </p>
        <p className="sportPositionHeadlineHeader">
          Let's start creating your athletic profile.
        </p>
        <form>
          <div className="sportPositionInputForms">
            <p
              className="sportPositionTextInputHeader"
              style={{ marginTop: '7%' }}
            >
              Location
            </p>
            <PlacesAutocomplete
              value={location}
              onChange={setLocation}
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
                    {...getInputProps({ className: "sportPositionTextInput" })}
                  />
                  <div>
                    {suggestions.map((suggestion) => {
                      const style = {
                        // backgroundColor: suggestion.active ? "#3eb489" : "#fff",
                        fontWeight: suggestion.active ? 'bold' : '400',
                        cursor: "pointer",
                        fontSize: suggestion.active ? 13.5 : 13,
                        fontFamily: 'Open Sans',
                        marginBottom: 15,
                        marginLeft: 5.5,
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })} >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {invalidLocation && <h1 className="sportPositionLocationInvalidText">Location is required</h1>}
            <p className="sportPositionTextInputHeader">Sport</p>
            <select
              className="sportPositionTextInput"
              onChange={(event) => {
                setInvalidSport(false);
                setInvalidOtherSport(false);
                setSport(event.target.options[event.target.selectedIndex].text);
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
              <option value="Other">Other</option>
            </select>
            {invalidSport && (
              <h1 className="sportPositionLocationInvalidText">Please select a sport</h1>
            )}
            {/* If other is pressed this code executes */}
            {sport === 'Other' ? 
            <>
              <p className="sportPositionTextInputHeader">Sport</p>
              <input
                className="sportPositionTextInput"
                required
                placeholder={'What Sport do you play?'}
                onChange={(text) => {
                  setOtherSport(text.target.value);
                  setInvalidOtherSport(false)
                }}
                type="text"
                id="OtherSport"
              />
              {invalidOtherSport && (<h1 className="sportPositionLocationInvalidText">Please enter your other sport or pick a sport</h1>)}
            </>
            : null}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p className="sportPositionTextInputHeader">Position</p>
              {!noPosition && <div style={{ display: "flex", alignItems: "center" }}>
                <p
                  className="sportPositionTextInputHeader"
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => {
                    if (!noPosition) {
                      onIconPressed();
                    }
                  }}
                >
                  {positionIconText}
                </p>
                {positionIcon === 'BsMinus' ? (
                  <BiMinus
                    onClick={() => {
                      if (!noPosition) {
                        onIconPressed();
                      }
                    }}
                    style={{ marginBottom: 5, cursor: 'pointer' }}
                    size={20}
                    color={'black'}
                  />
                ) : (
                  <BsPlus
                    onClick={() => {
                      onIconPressed();
                    }}
                    style={{ marginBottom: 5, cursor: 'pointer' }}
                    size={20}
                    color={'black'}
                  />
                )}
              </div>}
            </div>
            {noPosition ? (
              <input
                readOnly={true}
                className="sportPositionTextInput"
                style={{
                  outline: "none",
                  borderStyle: "solid",
                  boxShadow: "none",
                  borderColor: "#ededed",
                  backgroundColor: "#00000014",
                  color: "#0000004D",
                }}
                // placeholder={"Ex: Quarterback, Point Guard, Midfielder"}
                value={"Position"}
              />
            ) : (
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
            )}
            {positionIcon === "BsMinus" ? (
              <input
                className="sportPositionTextInput"
                placeholder={'Ex: Linebacker, Shooting Guard, Striker'}
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
              <h1 className="sportPositionLocationInvalidText">
                Please enter a position or choose "I don't have a position"
              </h1>
            )}
            {positionIcon === "BsPlus" ? (
              <p className="sportsNoPositionText" onClick={() => handleNoPositionToggle()}>{havePositionText}</p>
            ) : null}
            <button
              onClick={() => {
                handleSubmission();
              }}
              className="sportPositionNextButton"
              type="button"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SportPosition;
