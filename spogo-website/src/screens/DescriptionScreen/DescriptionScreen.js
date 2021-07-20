import React, { useEffect, useState } from "react";
import "./DescriptionScreen.css";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  Redirect
} from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import {
  getExperienceArray,
  getTrophyArray,
  getUserDataCollected,
} from "../../ProfileData";
import CrownIcon from "mdi-react/CrownIcon";
import TrophyIcon from "mdi-react/TrophyIcon";

import SpogoLogo from "./spogo_logo.png";

const DescriptionScreen = (props) => {
  let path = props.url;
  let UID = path.substring(path.lastIndexOf("/") + 1);
  const location = useLocation();
  let icon;
  //   const {[icon, setIcon]} = useState();
  if (location.state === undefined) {
    icon = "null";
  } else {
    icon = location.state;
  }
  const [itemArray, setItemArray] = useState([]);

  const [headerName, setHeaderName] = useState("");

  useEffect(() => {
    if (icon.icon === "trophy") {
      setHeaderName("Accomplishments");
      setItemArray(getTrophyArray());
    } else {
      setHeaderName("Experiences");
      setItemArray(getExperienceArray());
    }
    findSize();
  }, []);

  const [iconSize, setIconSize] = useState(25);

  const findSize = () => {
    if (window.innerWidth < 600) {
      setIconSize(25);
    } else if (window.innerWidth < 1200) {
      setIconSize(40);
    } else {
      setIconSize(55);
    }
  };

  let ItemIcon = (props) => {
    let iconType = props.iconType.icon;
    if (iconType === "trophy") {
      return <TrophyIcon color="#A08864" size={iconSize} />;
    } else {
      return <CrownIcon color="#ffbb48" size={iconSize} />;
    }
  };

  const [showMore, setShowMore] = useState(false);
  const descriptionSeeMoreSeeLess = (text) => {
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
              {' '}
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
          <div className="Header">
            <Link to={`/users/${UID}`} className="Link">
              <IoChevronBack
                size={iconSize}
                color="blue"
                className="BackIcon"
              />
            </Link>
            <h1>{headerName}</h1>
            <h2>B</h2>
          </div>
          <hr className="HeaderDivider" size="2" color="lightgrey" />
          <div>
            <ul className="List">
              {itemArray.map((item) => {
                if (icon === "trophy") {
                  return (
                    <div>
                      <div
                        className="ItemContainer"
                        //   style={{ height: window.innerHeight / 12 }}
                      >
                        <ItemIcon iconType={icon} />
                        <div className="InfoContainer" key={item.idNum}>
                          <h1>{item.title}</h1>
                          <h2>{item.duration}</h2>
                          <h3>{descriptionSeeMoreSeeLess(item.description)}</h3>
                        </div>
                      </div>
                      <hr size="2" color="lightgrey" className="Divider" />
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <div
                        className="ItemContainer"
                        //   style={{ height: window.innerHeight / 12 }}
                      >
                        <ItemIcon iconType={icon} />
                        <div className="InfoContainer" key={item.idNum}>
                          <h1>{item.title}</h1>
                          <h2>{item.duration}</h2>
                          <h3>{descriptionSeeMoreSeeLess(item.description)}</h3>
                        </div>
                      </div>
                      <hr size="2" color="lightgrey" className="Divider" />
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
        // <div className="DataLoadFailedContainer">
        //   <h1>User's data can't be loaded.</h1>
        //   <Link to={`/users/${UID}`} className="Link">
        //     <h2 className="FailedLoadSecondText">
        //       Try going to their profile first.
        //     </h2>
        //   </Link>
        //   {/* spogo.us/users/{UID} */}
        //   <div className="SpogoLogoDescriptionScreen">
        //     <img src={SpogoLogo} alt="Spogo" />
        //   </div>
        // </div>
        <>        
          <Redirect to={`/users/${UID}`} />
        </>
      );
    }
  }
};

export default DescriptionScreen;
