import React, { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import './SportPosition.css';
import { Link, useHistory } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import {
  getUserDict,
  addUserInfo,
  getUserInfo,
  setUserDict,
} from '../../../UserData';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import firebase from '../../../firebase';

const SportPosition = (props) => {
  let userUID = props.userUID;
  const [userName, setUserName] = useState(getUserInfo('name'));
  const [signUpFinished, setSignUpFinished] = useState(
    getUserInfo('sign-up-finished')
  );
  const [sport, setSport] = useState('');
  const [otherSport, setOtherSport] = useState('');
  const [invalidSport, setInvalidSport] = useState('');
  const [positionOne, setPositionOne] = useState('');
  const [positionTwo, setPositionTwo] = useState('');
  // const [positionText, setPositionText] = useState("");
  const [invalidPosition, setInvalidPosition] = useState('');
  let history = useHistory();

  useEffect(async () => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
    if (
      getUserInfo('name') === null ||
      getUserInfo('name') === undefined ||
      getUserInfo('email') === null ||
      getUserInfo('email') === undefined
    ) {
      await getUserInfoDictFromDB();
      setUserName(getUserInfo('name'));
      setSignUpFinished(getUserInfo('sign-up-finished'));
      console.log(getUserInfo('name'));
      console.log(getUserInfo('email'));
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
    if (sport === '') {
      setInvalidSport(true);
      validSubmission = false;
    } else {
    }
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
    if (validSubmission) {
      if (sport === 'Other') {
        addUserInfo('sport', sport)
      } else {
        addUserInfo('sport', sport);
      }

      addUserInfo('position', positionText);
      console.log(getUserDict());
      history.push('/auth/sign-up/socials');
    }
  };

  if (signUpFinished === true) {
    history.push('/create');
  }

  const [address, setAddress] = React.useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setAddress(value);
  };

  //use this to store in database - by the second comma, suggestion.description.substring(0, nthIndex(suggestion.description, ',', 2))
  function nthIndex(str, pat, n) {
    var L = str.length,
      i = -1;
    while (n-- && i++ < L) {
      i = str.indexOf(pat, i);
      if (i < 0) break;
    }
    return i;
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
              style={{ marginTop: '8%' }}
            >
              Location
            </p>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={{ types: ['(cities)'] }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({ className: 'sportPositionTextInput' })}
                  />

                  <div>
                    {/* {loading ? <div>Loading...</div> : null} */}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? '#3eb489' : '#fff',
                        cursor: 'pointer',
                        marginBottom: 5,
                        fontSize: 12,
                        fontFamily: 'Open Sans',
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
            <p className="sportPositionTextInputHeader">Sport</p>
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
            {/* If other is pressed this code executes */}
            {sport ==='Other' ? <>
              <p className="sportPositionTextInputHeader">Sport</p>
              <input
                className="sportPositionTextInput"
                required
                placeholder={'What Sport do you play?'}
                onChange={(text) => {
                  setOtherSport(text.target.value);
                }}
                type="text"
                id="OtherSport"
              />
            </>: null}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p className="sportPositionTextInputHeader">Position</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p
                  className="sportPositionTextInputHeader"
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => {
                    onIconPressed();
                  }}
                >
                  {positionIconText}
                </p>
                {positionIcon === 'BsMinus' ? (
                  <BiMinus
                    onClick={() => {
                      // setPositionIcon("BsPlus");
                      onIconPressed();
                    }}
                    style={{ marginBottom: 5, cursor: 'pointer' }}
                    size={20}
                    color={'black'}
                  />
                ) : (
                  <BsPlus
                    onClick={() => {
                      // setPositionIcon("BiMinus");
                      onIconPressed();
                    }}
                    style={{ marginBottom: 5, cursor: 'pointer' }}
                    size={20}
                    color={'black'}
                  />
                )}
              </div>
            </div>
            <input
              className="sportPositionTextInput"
              placeholder={'Ex: Quarterback, Point Guard, Midfielder'}
              type="text"
              id="Position"
              value={positionOne}
              onChange={(text) => {
                setPositionOne(text.target.value);
                setInvalidPosition(false);
              }}
            />
            {positionIcon === 'BsMinus' ? (
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
              <h1 className="invalidText">
                Please enter a position or choose "I don't have a position"
              </h1>
            )}
            {positionIcon === 'BsPlus' ? (
              <p className="sportsNoPositionText">I don't have a position.</p>
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
