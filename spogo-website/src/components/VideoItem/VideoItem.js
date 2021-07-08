import React, { useState, useEffect } from "react";
import "./VideoItem.css";
import ReactPlayer from "react-player";
import firebase from "../../firebase";

export const VideoItem = (props) => {
  const [paused, setPaused] = useState(true);
  const [mediaURL, setMediaURL] = useState("");

  useEffect(async () => {
    try {
      const profileImageUri = await firebase.storage().ref(props.url);
      setMediaURL(await profileImageUri.getDownloadURL());
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    // <button>
    //   <ReactPlayer url={mediaURL}/>
    // </button>
    <div className="mediaContainer">
      {/* <ReactPlayer url={mediaURL} playing={true}/> */}
      <video
        src={mediaURL}
        controls
        style={{
          height: (window.innerWidth < 600) ? window.innerHeight / 6 : window.innerHeight / 6,
          width: (window.innerWidth < 600) ? window.innerWidth / 2 : window.innerWidth / 3,
          marginRight: window.innerWidth / 150,
          marginTop: window.innerHeight / 80,
        }}
      >
        {/* <source src={mediaURL} type="video/mp4"/> */}
      </video>
    </div>
  );
};

export const ImageItem = (props) => {
  const [paused, setPaused] = useState(true);
  const [mediaURL, setMediaURL] = useState();

  useEffect(async () => {
    try {
      const profileImageUri = await firebase.storage().ref(props.url);
      setMediaURL(await profileImageUri.getDownloadURL());
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="mediaContainer">
      <img
        src={mediaURL}
        style={{
          height: (window.innerWidth < 600) ? window.innerHeight / 6 : window.innerHeight / 6,
          width: (window.innerWidth < 600) ? window.innerWidth / 2 : window.innerWidth / 3,
          marginRight: window.innerWidth / 150,
          marginTop: window.innerHeight / 80,
        }}
      />
    </div>
  );
};
