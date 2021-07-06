import React, { useEffect, useState } from "react";
import Item from "../../components/ExpTrophyMesItem/Item";
import { VideoItem, ImageItem } from "../../components/VideoItem/VideoItem";
import "./Profile.css";
import firebase from "../../firebase";

import {
  addUserInfo,
  setUserDict,
  setExperienceArray,
  setTrophyArray,
  setMeasurableArray,
  setMediaArray,
  getUserInfo,
  setExperienceID,
  setTrophyID,
  setMeasurableID,
  setVideoImageID,
  getExperienceArray,
  getTrophyArray,
  getMeasurableArray,
  getUserDict,
  getMediaArray,
} from "../../ProfileData";

const Profile = (props) => {
  let path = props.url;
  let UID = path.substring(path.lastIndexOf("/") + 1);
  const [thisUserInfoDict, setThisUserInfoDict] = useState({});
  const [thisTrophyArray, setThisTrophyArray] = useState([]);
  const [thisExperienceArray, setThisExperienceArray] = useState([]);
  const [thisMeasurableArray, setThisMeasurableArray] = useState([]);
  const [thisMediaArray, setThisMediaArray] = useState([]);
  const [userExists, setUserExists] = useState(true);

  useEffect(async () => {
    // async function fetchData () {
    //   await getDBUserInfo();
    //   trophyArray = getTrophyArray();
    //   experienceArray = getExperienceArray();
    //   measurableArray = getMeasurableArray();
    //   mediaArray = getMediaArray()
    // }
    await getDBUserInfo();
  }, []);

  const getDBUserInfo = async () => {
    try {
      let dbPath = firebase
      .firestore()
      .collection("Users")
      //.doc(user.uid)
      //.doc("2D9V1nIX3lgZvtqG3luh9hkcdPv2")
      .doc(UID)
      .collection("User Info");
    let profileData = dbPath.doc("Profile Data");
    await profileData
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserDict(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("User Info doc not found!");
          setUserExists(false);
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
          // doc.data() will be undefined in this case
          console.log("Exp Array doc not found!");
        }
      })
      .catch((error) => {
        console.log("Error getting exp array document:", error);
      });
    let trophyArray = dbPath.doc("Trophy Array");
    await trophyArray
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTrophyArray(doc.data());
        } else {
          // doc.data() will be undefined in this case
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
          // doc.data() will be undefined in this case
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
          // doc.data() will be undefined in this case
          console.log("Media Array doc not found!");
        }
      })
      .catch((error) => {
        console.log("Error getting media array document:", error);
      });
    } catch (e) {
      console.log(e)
      setUserExists(false);
    }
    
    // setArrayID();
    setThisUserInfoDict(getUserDict());
    setThisTrophyArray(getTrophyArray());
    setThisExperienceArray(getExperienceArray());
    setThisMeasurableArray(getMeasurableArray());
    setThisMediaArray(getMediaArray());
    setUserInfo();
    displayProfileImage();
  };

  async function displayProfileImage() {
    try {
      const profileImageUri = await firebase
        .storage()
        .ref(getUserInfo("profile-image"));
      const url = await profileImageUri.getDownloadURL();
      setProfileImage(url);
    } catch (e) {
      console.log(e);
    }
  }

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [sport, setSport] = useState();
  const [position, setPosition] = useState();
  const [location, setLocation] = useState();
  const [instagram, setInstagram] = useState();
  const [twitter, setTwitter] = useState();
  const [wildcard, setWildcard] = useState();
  const [bio, setBio] = useState();
  const [profileImage, setProfileImage] = useState();

  function setUserInfo() {
    setEmail(getUserInfo("preferred-email"));
    setName(getUserInfo("name"));
    setSport(getUserInfo("sport"));
    setPosition(getUserInfo("position"));
    setLocation(getUserInfo("location"));
    setInstagram(getUserInfo("instagram-handle"));
    setTwitter(getUserInfo("twitter-handle"));
    setWildcard(getUserInfo("wildcard"));
    setBio(getUserInfo("bio"));
  }

  return userExists ? (
    <div className="ProfileScreen">
      <div className="ProfileHeader">
        <img className="ProfileImage" src={profileImage} />
        <h1>{name}</h1>
        <h2>{position === "" ? sport : sport + " - " + position}</h2>
        <h3>{location}</h3>
      </div>
      <div className="ProfileList">
        <h1 className="ListHeader">Media</h1>
        <ul className="List">
          {thisMediaArray.map((item) => {
            if (item.media === 'photo') {
              return <ImageItem url={item.url} />;
            } else {
              return <VideoItem url={item.url} />;
            }
            // return <ImageItem url={item.url} />;
          })}
        </ul>
      </div>
      <div className="ProfileList">
        <h1 className="ListHeader">Experience</h1>
        <ul className="List">
          {thisExperienceArray.map((item) => (
            <Item
              iconName="crown"
              color="#ffbb48"
              title={item.title}
              time={item.duration}
              idNum={item.idNum}
            />
          ))}
        </ul>
      </div>
      <div className="ProfileList">
        <h1 className="ListHeader">Trophy</h1>
        <ul className="List">
          {thisTrophyArray.map((item) => (
            <Item
              iconName="trophy"
              color="#A08864"
              title={item.title}
              time={item.duration}
              idNum={item.idNum}
            />
          ))}
        </ul>
      </div>
      <div className="ProfileList">
        <h1 className="ListHeader">Measurables</h1>
        <ul className="List">
          {thisMeasurableArray.map((item) => (
            <Item
              iconName="rocket-launch"
              color="dodgerblue"
              title={item.title}
              time={item.value}
              idNum={item.idNum}
            />
          ))}
        </ul>
      </div>
      {/* <div className='ProfileList'>
        <h1 className='ListHeader'>Experience</h1>
        <ul className="List">
          {words.map((word) => (
            <Item 
              input={word} 
            />
          ))}
        </ul>
      </div> */}
    </div>
  ) : (
    <div>
      <h1>User Doesn't Exist</h1>
    </div>
  );
};

export default Profile;
