import React, { useEffect, useState } from "react";
import WebFont from "webfontloader";
import "./SportPosition.css";
import {Link} from 'react-router-dom';
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import {getUserDict, getUserHolderDict} from '../../../UserData';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const SportPosition = () => {
  const [userName, setUserName] = useState(getUserHolderDict().name)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);

  const [positionIcon, setPositionIcon] = useState('BsPlus');
  const [positionIconText, setPositionIconText] = useState('Add a Position');
  const [address, setAddress] = useState('');

  const handleSelect = async (value) => {};

  const onIconPressed = () => {
    if (positionIcon === "BsPlus") {
      setPositionIcon("BsMinus");
      setPositionIconText("Remove a Position");
      console.log(positionIcon);
    }
    if (positionIcon === "BiMinus") {
      setPositionIcon("BsPlus");
      setPositionIconText("Add a Position");
      console.log(positionIcon);
    }
  };

  return (
    <div className="sportPositionScreenContainer">
      <div className="sportPositionContainer">
        <p className="sportPositionFormHeader">
          Hello{' ' + userName}! Welcome to Spogo!
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
                    {loading ? <div>Loading...</div> : null}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
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
            <select className="sportPositionTextInput">
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
                  style={{ fontWeight: 'bold' }}
                  onClick={() => {
                    onIconPressed();
                  }}
                >
                  {positionIconText}
                </p>
                {positionIcon === 'BiMinus' ? (
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
              required
              placeholder={'Ex: Quarterback, Point Guard, Midfielder'}
              type="text"
              id="Position"
            />
            {positionIcon === 'BiMinus' ? (
              <input
                className="sportPositionTextInput"
                required
                placeholder={'Ex: Quarterback, Point Guard, Midfielder'}
                type="text"
                id="Position"
              />
            ) : null}
            {positionIcon === 'BsPlus' ? (
              <p className="sportsNoPositionText">I don't have a position.</p>
            ) : null}
            <Link
              to={"/auth/sign-up/socials"}
              className="sportPositionNextButton"
            >
              <button
                className="sportPositionNextButton"
              >
                Next
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SportPosition;
