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
import { MdAdd, MdDelete, MdClose } from "react-icons/md";
import WebFont from "webfontloader";
import {
  EditableVideoItem,
  EditableImageItem,
} from "../../components/EditableMediaItem/EditableMediaItem";
import firebase from "../../../firebase";
import { UserDataContext } from "../../../App";
import { Line } from "rc-progress";
import Modal from "react-modal";

const VideoList = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  let userUID = getUserUID();
  const [thisMediaArray, setThisMediaArray] = useState([]);
  const highlightFile = useRef(null);
  const [currentDeleteIconType, setCurrentDeleteIconType] = useState("delete");

  const highlightUploadClick = () => {
    highlightFile.current.click();
  };

  useEffect(() => {
    setThisMediaArray([...props.mediaArray]);
  }, [props.refresh]);

  const parentCallbackRefresh = () => {
    setThisMediaArray([...getMediaArray()]);
  };

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
        if (e.target.files[0].size < 50000000) {
          if (e.target.files[0].type.match("image.*")) {
            console.log(e.target.files[0]);
            uploadFileToStorage(imageFile.name, e.target.files[0], "photo");
          } else if (e.target.files[0].type.match("video.*")) {
            console.log(e.target.files[0]);
            uploadFileToStorage(imageFile.name, e.target.files[0], "video");
          }
        } else {
          window.confirm("Maximum upload size is 50mb.");
        }
      }
    }
    return { result, uploader };
  }

  const { result, uploader } = UploadMediaFunction();

  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);

  const uploadFileToStorage = async (mediaName, mediaFile, type) => {
    let mediaUploadTime = new Date().getTime();
    let mediaReference =
      mediaName +
      "-" +
      mediaUploadTime +
      userUID.charAt(0) +
      userUID.charAt(3) +
      userUID.charAt(6);

    setUploading(true);

    const task = firebase.storage().ref(mediaReference).put(mediaFile);

    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    });

    try {
      await task;
      addVideoItem(getVideoImageID(), mediaReference, type);
      addVideoImageID();
      await updateMediaArrayInDB();
      setThisMediaArray([...getMediaArray()]);
      setUploading(false);
      setTransferred(0);
    } catch (e) {
      window.confirm(
        "Something went wrong. Please make sure your maximum upload size is 50mb and try again."
      );
      console.log(e);
    }
  };

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

  const [deleteMediaButtonActive, setDeleteMediaButtonActive] = useState(false);
  const [imageVideoChildRefresh, setImageVideoChildRefresh] = useState(false);

  return (
    <div className="videoListContainer">
      <Modal isOpen={uploading} className="uploadProgressModalContainer" overlayClassName="uploadProgressModalOverlay">
        <div className="uploadProgressModalContent">
          <p>Upload Progress</p>
          <Line percent={transferred} strokeWidth="4" strokeColor="black" />
        </div>
      </Modal>
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
        <div className="videoListHeaderIconContainer">
          {thisMediaArray.length != 0 &&
            (currentDeleteIconType === "delete" ? (
              <MdDelete
                size={25}
                color={"#C41E3A"}
                className="videoListDeleteIcon"
                onClick={() => {
                  setDeleteMediaButtonActive(!deleteMediaButtonActive);
                  setImageVideoChildRefresh(!imageVideoChildRefresh);
                  setCurrentDeleteIconType("close");
                }}
              />
            ) : (
              <MdClose
                size={25}
                color={"grey"}
                className="videoListDeleteIcon"
                onClick={() => {
                  setDeleteMediaButtonActive(!deleteMediaButtonActive);
                  setImageVideoChildRefresh(!imageVideoChildRefresh);
                  setCurrentDeleteIconType("delete");
                }}
              />
            ))}
          <MdAdd
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
      </div>

      <hr
        className="createScreenComponentHeaderDivider"
        size="1"
        color="lightgrey"
      />
      <ul className="videoItemArrayList">
        {thisMediaArray.map((item) => {
          if (item.media === "photo") {
            return (
              <EditableImageItem
                url={item.url}
                key={item.url}
                idNum={item.idNum}
                refresh={imageVideoChildRefresh}
                showMediaDelete={deleteMediaButtonActive}
                callbackRefresh={parentCallbackRefresh}
              />
            );
          } else {
            return (
              <EditableVideoItem
                url={item.url}
                key={item.url}
                idNum={item.idNum}
                refresh={imageVideoChildRefresh}
                showMediaDelete={deleteMediaButtonActive}
                callbackRefresh={parentCallbackRefresh}
              />
            );
          }
        })}
      </ul>
    </div>
  );
};

export default VideoList;
