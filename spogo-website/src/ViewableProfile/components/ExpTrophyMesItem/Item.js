import React, { useEffect, useState } from 'react';
import './Item.css';
import CrownIcon from 'mdi-react/CrownIcon';
import TrophyIcon from 'mdi-react/TrophyIcon';
import RocketLaunchIcon from 'mdi-react/RocketLaunchIcon';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MixpanelConsumer } from 'react-mixpanel';
import {
  getExperienceArray,
  getAccomplishmentArray,
  getMeasurableArray,
} from '../../../ProfileData';
import WebFont from 'webfontloader';
import {ViewableAccomplishmentDescriptionModal, ViewableExperienceDescriptionModal} from '../../screens/DescriptionScreen/DescriptionScreen';

const Item = (props) => {
  let icon = props.iconName;
  let color = props.color;
  let title = props.title;
  let team = props.team;
  let time = props.time;
  let description = props.description;
  let idNum = props.idNum;
  let UID = props.userUID;

  const [iconToHeaderName, setIconToHeaderName] = useState('');

  const [specificItemArray, setSpecificArray] = useState([]);

  const getSpecificArray = () => {
    if (icon === 'crown') {
      setSpecificArray(getExperienceArray());
    } else if (icon === 'trophy') {
      setSpecificArray(getAccomplishmentArray());
    } else {
      setSpecificArray(getMeasurableArray());
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Poppins']
      }
    });
   }, []);

  useEffect(() => {
    findSize();
    getSpecificArray();
  }, []);

  let ItemIcon = (props) => {
    let iconType = props.iconType;
    if (iconType === 'trophy') {
      setIconToHeaderName('Accomplishment');
      return <TrophyIcon color={color} size={iconSize} />;
    } else if (iconType === 'crown') {
      setIconToHeaderName('Experience');
      return <CrownIcon color={color} size={iconSize} />;
    } else {
      setIconToHeaderName('Measurable');
      return <RocketLaunchIcon color={color} size={iconSize} />;
    }
  };

  const [iconSize, setIconSize] = useState(20);

  const findSize = () => {
    if (window.innerWidth < 600) {
      setIconSize(20);
    } else if (window.innerWidth < 1200) {
      setIconSize(22);
    } else {
      setIconSize(25);
    }
  };

  const [showMore, setShowMore] = useState(false);
  const descriptionSeeMoreSeeLess = (text, platform) => {
    if (platform === 'phone') {
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
                {' '}
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
              <span className="seeMoreButton" onClick={() => setShowMore(true)}>
                {' '}
                ...See More
              </span>
            </p>
          </div>
        );
      }
    }
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
              <div className="viewableItemContainer">
                <div className="viewableItemIconContainer">
                  <ItemIcon iconType={icon} />
                </div>
                <div className="viewableItemTextContainer" onClick={() => handleItemClick(icon)}>
                  <h1>{title}</h1>
                  {team != undefined && team != null && team != '' && (
                    <h2>{team}</h2>
                  )}
                  <h3>{time}</h3>
                  <h4>{description}</h4>
                  {(idNum === 0 && specificItemArray.length === 1) ||
                  idNum === specificItemArray.length - 1 ? (
                    <hr size="1" color="white" className="viewableItemDivider" />
                  ) : (
                    <hr size="1" color="lightgrey" className="viewableItemDivider" />
                  )}
                </div>
              </div>
          ) : (
            <div
              className="viewableItemContainer"
              onClick={() =>
                mixpanel.track('Specific Item Type Pressed', {
                  Item: iconToHeaderName,
                })
              }
            >
              <div className="viewableItemIconContainer">
                <ItemIcon iconType={icon} />
              </div>
              <div className="viewableItemTextContainer">
                <h1>{title}</h1>
                {team != undefined && team != null && team != '' && (
                  <h2>{team}</h2>
                )}
                <h3>{time}</h3>
                {description ? (
                  <h4>{descriptionSeeMoreSeeLess(description, 'website')}</h4>
                ) : null}
                {(idNum === 0 && specificItemArray.length === 1) ||
                idNum === specificItemArray.length - 1 ? (
                  <hr size="1" color="white" className="viewableItemDivider" />
                ) :  (
                  <hr size="1" color="lightgrey" className="viewableItemDivider" />
                )}
              </div>
            </div>
          )}
          <ViewableExperienceDescriptionModal modalOpen={experienceDescriptionModalOpen} refresh={experienceDescriptionModalRefresh}/>
          <ViewableAccomplishmentDescriptionModal modalOpen={accomplishmentDescriptionModalOpen} refresh={accomplishmentDescriptionModalRefresh}/>
        </>
      )}
    </MixpanelConsumer>
  );
};

export default Item;
