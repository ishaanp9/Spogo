import React, { useState, useEffect, useRef, useContext } from "react";
import {
  addVideoImageID,
  addVideoItem,
  getMediaArray,
  getUserDict,
  getVideoImageID,
  setMediaArray,
} from "../../../UserData";
import "./VideoList.css";
import { MdAdd } from "react-icons/md";
import WebFont from "webfontloader";
import {
  EditableVideoItem,
  EditableImageItem,
} from "../../components/EditableMediaItem/EditableMediaItem";
import firebase from "../../../firebase";
import { UserDataContext } from "../../../App";

const VideoList = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  let userUID = getUserUID();
  const [thisMediaArray, setThisMediaArray] = useState([]);
  const highlightFile = useRef(null);

  const highlightUploadClick = () => {
    highlightFile.current.click();
  };

  useEffect(() => {
    setThisMediaArray([...props.mediaArray]);
  }, [props.refresh]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Open Sans", "Public Sans"],
      },
    });
  }, []);

  function UploadMediaFunction() {
    const [result, setResult] = useState("");

    async function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      if (e.target.files[0]) {
        reader.readAsDataURL(imageFile);
        if (e.target.files[0].type.match("image.*")) {
          console.log(e.target.files[0]);
          uploadFileToStorage(imageFile.name, e.target.files[0], "photo");
        } else if (e.target.files[0].type.match("video.*")) {
          console.log(e.target.files[0]);
          uploadFileToStorage(imageFile.name, e.target.files[0], "video");
        }
      }
    }
    return { result, uploader };
  }

  const { result, uploader } = UploadMediaFunction();

  const uploadFileToStorage = async (mediaName, mediaFile, type) => {
    let mediaUploadTime = new Date().getTime();
    let mediaReference =
      mediaName +
      "-" +
      mediaUploadTime +
      userUID.charAt(0) +
      userUID.charAt(3) +
      userUID.charAt(6);
    const task = firebase
      .storage()
      .ref(mediaReference)
      .put(mediaFile)
      .then(() => {
        console.log("Storage Upload Succeeded");
      });

    try {
      await task;
      addVideoItem(getVideoImageID(), mediaReference, type);
      addVideoImageID();
      await updateMediaArrayInDB();
      setThisMediaArray([...getMediaArray()]);
    } catch (e) {
      console.log(e);
    }
  };

  //   const uploadImageToFB = (imageFile) => {
  //     let mediaUploadTime = new Date().getTime()
  //     console.log(imageFile.name + '-' + mediaUploadTime + userUID.charAt(0) + userUID.charAt(3) + userUID.charAt(6))
  //     const task = firebase
  //         .storage()
  //         .ref(imageFile.name + '-' + mediaUploadTime)
  //         .put(e.target.files[0])
  //         .then(() => {
  //           console.log("Storage Upload Succeeded");
  //         });

  //     try {
  //         await task;
  //         addVideoItem(getVideoImageID(), imageFile, 'photo')
  //     } catch (e) {
  //         console.log(e)
  //     }
  //   }

  //Updates userInfoDict in firebase
  const updateMediaArrayInDB = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .doc(userUID)
      .collection("User Info")
      .doc("Media Array")
      .set({
        mediaArray: getMediaArray(),
      })
      .then(() => {
        console.warn("User added!");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="videoListContainer">
      <input
        type="file"
        accept="image/*, video/*"
        id="target"
        ref={highlightFile}
        onChange={(e) => {
          uploader(e);
        }}
        style={{ display: "none" }}
      />
      <div className="videoListHeaderContainer">
        <h1 className="videoListHeaderText">Highlights</h1>
        <MdAdd
          style={{ cursor: "pointer" }}
          className="videoListAddIcon"
          size={25}
          onClick={
            getMediaArray().length < 3
              ? () => {
                  highlightUploadClick();
                }
              : () => {
                  window.confirm(
                    "You can currently only upload a maximum of 3 highlights."
                  );
                }
          }
        />
      </div>
      <hr
        className="createScreenComponentHeaderDivider"
        size="1"
        color="lightgrey"
      />
      <ul className="videoItemArrayList">
        {thisMediaArray.map((item) => {
          if (item.media === "photo") {
            return <EditableImageItem url={item.url} key={item.url} />;
          } else {
            return <EditableVideoItem url={item.url} key={item.url} />;
          }
        })}
      </ul>
    </div>
  );
};

export default VideoList;
