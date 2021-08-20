import React, { useEffect, useState } from "react";
import "./DescriptionScreen.css";
import {
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import {
  getExperienceArray,
  getAccomplishmentArray,
} from "../../../ProfileData";
import Modal from 'react-modal';
import CrownIcon from "mdi-react/CrownIcon";
import TrophyIcon from "mdi-react/TrophyIcon";
import WebFont from 'webfontloader';

export const ViewableExperienceDescriptionModal = (props) => {
  const [experienceDescriptionModalOpen, setExperienceDescriptionModalOpen] =
    useState(props.modalOpen);

  const [experienceArray, setExperienceArray] = useState(getExperienceArray());

  useEffect(() => {
    setExperienceDescriptionModalOpen(props.modalOpen);
    setExperienceArray(getExperienceArray());
  }, [props.refresh]);

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
  return (
    <Modal
      appElement={document.getElementById("root") || undefined}
      isOpen={experienceDescriptionModalOpen}
      className={"experienceDescriptionModalContainer"}
    >
      <div>
        <div className="descriptionScreenHeader">
          <Link>
            <IoChevronBack
              size={25}
              color="blue"
              className="BackIcon"
              onClick={() => setExperienceDescriptionModalOpen(false)}
            />
          </Link>

          <h1>Experiences</h1>
          <h2>B</h2>
        </div>
        <hr
          className="descriptionScreenHeaderDivider"
          size="1"
          color="lightgrey"
        />
        <div>
          <ul>
            {experienceArray.map((item) => {
              return (
                <div>
                  <div className="descriptionScreenItemContainer">
                    <div className="descriptionItemIconContainer">
                      <CrownIcon color="#ffbb48" size={25} />
                    </div>{" "}
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
            })}
          </ul>
        </div>
        <hr
          size="1"
          color="lightgrey"
          className="descriptionScreenBottomDivider"
        />
      </div>
    </Modal>
  );
};

export const ViewableAccomplishmentDescriptionModal = (props) => {
  const [
    accomplishmentDescriptionModalOpen,
    setAccomplishmentDescriptionModalOpen,
  ] = useState(props.modalOpen);

  const [accomplishmentArray, setAccomplishmentArray] = useState(
    getExperienceArray()
  );

  useEffect(() => {
    setAccomplishmentDescriptionModalOpen(props.modalOpen);
    setAccomplishmentArray(getAccomplishmentArray());
  }, [props.refresh]);

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

  return (
    <Modal
      appElement={document.getElementById("root") || undefined}
      isOpen={accomplishmentDescriptionModalOpen}
      className={"experienceDescriptionModalContainer"}
    >
      <div>
        <div className="descriptionScreenHeader">
          <Link>
            <IoChevronBack
              size={25}
              color="blue"
              className="BackIcon"
              onClick={() => setAccomplishmentDescriptionModalOpen(false)}
            />
          </Link>
          <h1>Accomplishments</h1>
          <h2>B</h2>
        </div>
        <hr
          className="descriptionScreenHeaderDivider"
          size="1"
          color="lightgrey"
        />
        <div>
          <ul>
            {accomplishmentArray.map((item) => {
              return (
                <div>
                  <div className="descriptionScreenItemContainer">
                    <div className="descriptionItemIconContainer">
                      <TrophyIcon color="#A08864" size={25} />
                    </div>{" "}
                    <div className="itemTextContainer" key={item.idNum}>
                      <h1>{item.title}</h1>
                      <h2>{item.duration}</h2>
                      {item.description && (
                        <h5 className="accomplishmentDescription">{descriptionSeeMoreSeeLess(item.description)}</h5>
                      )}

                      <hr
                        size="1"
                        color="lightgrey"
                        className="itemBottomDivider"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <hr
          size="1"
          color="lightgrey"
          className="descriptionScreenBottomDivider"
        />
      </div>
    </Modal>
  );
};
