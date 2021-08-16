import React, { useEffect, useState } from "react";
import "./DescriptionScreen.css";
import {
  Link,
  BrowserRouter as Router,
  useLocation,
  Redirect,
} from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import {
  getExperienceArray,
  getAccomplishmentArray,
  getUserDataCollected,
} from "../../../ProfileData";
import CrownIcon from "mdi-react/CrownIcon";
import TrophyIcon from "mdi-react/TrophyIcon";
import WebFont from 'webfontloader';


const DescriptionScreen = (props) => {
  let path = props.url;
  let UID = path.substring(path.lastIndexOf("/") + 1);
  const location = useLocation();
  let icon;
  //Gets icon type from navigator
  if (location.state === undefined) {
    icon = "null";
  } else {
    icon = location.state;
  }
  const [itemArray, setItemArray] = useState([]);

  const [headerName, setHeaderName] = useState("");

  useEffect(() => {
    //Based on icon type, determines what header to show
    if (icon.icon === "trophy") {
      setHeaderName("Accomplishments");
      setItemArray(getAccomplishmentArray());
    } else {
      setHeaderName("Experiences");
      setItemArray(getExperienceArray());
    }
    determineIconSize();
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);

  const [iconSize, setIconSize] = useState(25);

  //Determines what size icons should be based on screen width
  const determineIconSize = () => {
    setIconSize(25)
  };

  //Based on icon type, displays either crown or trophy icons
  let DetermineAndDisplayItemIcon = (props) => {
    let iconType = props.iconType.icon;
    if (iconType === "trophy") {
      return <TrophyIcon color="#A08864" size={iconSize} />;
    } else {
      return <CrownIcon color="#ffbb48" size={iconSize} />;
    }
  };

  const [showMore, setShowMore] = useState(false);
  //See more see less for the item description
  const descriptionSeeMoreSeeLess = (text) => {
    if (text.length === 0) {
      return null;
    }
    if (text.length <= 121) {
      return text;
    }
    if (text.length > 121 && showMore) {
      return (
        <div>
          <p>{text}</p>
          <button className="seeLessButton" onClick={() => setShowMore(false)}>
            See Less
          </button>
        </div>
      );
    }
    if (text.length > 121) {
      return (
        <div>
          <p>
            {text.slice(0, 121)}
            <span className="seeMoreButton" onClick={() => setShowMore(true)}>
              {" "}
              ...See More
            </span>
          </p>
        </div>
      );
    }
  };

  {
    if (getUserDataCollected()) {
      return (
        <div>
          <div className="descriptionScreenHeader">
            <Link to={`/me/${UID}`}>
              <IoChevronBack
                size={iconSize}
                color="blue"
                className="BackIcon"
              />
            </Link>
            <h1>{headerName}</h1>
            <h2>B</h2>
          </div>
          <hr
            className="descriptionScreenHeaderDivider"
            size="1"
            color="lightgrey"
          />
          <div>
            <ul>
              {itemArray.map((item) => {
                if (icon === "trophy") {
                  return (
                    <div>
                      <div className="descriptionScreenItemContainer">
                        <div className="descriptionItemIconContainer">
                          <DetermineAndDisplayItemIcon iconType={icon} />
                        </div>{" "}
                        <div className="itemTextContainer" key={item.idNum}>
                          <h1>{item.title}</h1>
                          <h2>{item.duration}</h2>
                          <h3>{descriptionSeeMoreSeeLess(item.description)}</h3>
                        </div>
                      </div>
                      <hr
                        size="1"
                        color="lightgrey"
                        className="itemBottomDivider"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <div className="descriptionScreenItemContainer">
                        <div className="descriptionItemIconContainer">
                          <DetermineAndDisplayItemIcon iconType={icon} />
                        </div>
                        <div className="itemTextContainer" key={item.idNum}>
                          <h1>{item.title}</h1>
                          <h2>{item.team}</h2>
                          <h3>{item.duration}</h3>
                          <h4>{descriptionSeeMoreSeeLess(item.description)}</h4>
                          <hr
                            size="1"
                            color="lightgrey"
                            className="itemBottomDivider"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      );
    } else if (
      path === "spogo.us/descriptions" ||
      path === "http://spogo.us/descriptions" ||
      path === "http://localhost:3000/descriptions"
    ) {
      return (
        <div>
          <h1>Please try navigating to a user first</h1>
        </div>
      );
    } else {
      return (
        <>
          <Redirect to={`/me/${UID}`} />
        </>
      );
    }
  }
};

export default DescriptionScreen;
