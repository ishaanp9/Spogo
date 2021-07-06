import React, { useState, useEffect } from "react";
import "./VideoItem.css";
import ReactPlayer from "react-player";
import firebase from "../../firebase";

export const VideoItem = (props) => {
  const [paused, setPaused] = useState(true);
  const [mediaURL, setMediaURL] = useState();

  useEffect(async () => {
    try {
      const profileImageUri = await firebase.storage().ref(
        props.url
      );
      setMediaURL(await profileImageUri.getDownloadURL())
      // await firebase
      //   .storage()
      //   .ref(props.url)
      //   .getDownloadURL()
      //   .then(function (url) {
      //     var xhr = new XMLHttpRequest();
      //     xhr.responseType = "blob";
      //     xhr.onload = function (event) {
      //       var blob = xhr.response;
      //     };
      //     xhr.open("GET", url);
      //     xhr.send();
      //     setMediaURL(url);
      //   });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    // <button>
    //   <ReactPlayer url={mediaURL}/>
    // </button>
    <div>
      {/* <ReactPlayer url={mediaURL} playing={true}/> */}
      <video>
        <source src={mediaURL} />
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
    <div>
      <img src={mediaURL} />
    </div>
  );
};
