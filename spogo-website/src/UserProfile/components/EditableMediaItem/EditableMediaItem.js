import React, { useState, useEffect, useContext } from "react";
import "./EditableMediaItem.css";
import Modal from "react-modal";
import { MdClose, MdDelete } from "react-icons/md";
import firebase from "../../../firebase";
import { getMediaArray, deleteMediaItem } from "../../../UserData";
import { UserDataContext } from "../../../App";

export const EditableVideoItem = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  const [mediaURL, setMediaURL] = useState("");
  const [deleteActive, setDeleteActive] = useState(props.showMediaDelete);
  let userUID = getUserUID();

  useEffect(() => {
    setDeleteActive(props.showMediaDelete);
  }, [props.refresh]);

  useEffect(async () => {
    try {
      const profileImageUri = await firebase.storage().ref(props.url);
      setMediaURL(await profileImageUri.getDownloadURL());
    } catch (e) {
      console.error(e);
    }
  }, []);

  //Method called when the user tries to delete a media item
  const handleMediaDeleteClick = async () => {
    deleteMediaItem(props.idNum);
    await deleteMediaFromFBStorage();
    await updateMediaArrayDB();
    props.callbackRefresh();
  };

  //Method that takes a storage reference and deletes the file in that reference
  const deleteMediaFromFBStorage = async () => {
    let mediaName = firebase.storage().ref(props.url);
    await mediaName
      .delete()
      .then(() => {
        console.log(`${mediaName}has been deleted successfully.`);
      })
      .catch((e) => console.log("Failed to delete media - " + e));
  };

  //Method that updates the media array in the databased
  const updateMediaArrayDB = async () => {
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
        console.warn("Media Array Updated");
      });
  };

  return (
    <div className="mediaContainer">
      <video src={mediaURL} controls>
        {/* <source src={mediaURL} type="video/mp4"/> */}
      </video>
      {deleteActive && (
        <MdDelete
          size={40}
          color={"#C41E3A"}
          className="mediaDeleteIcon"
          onClick={() => handleMediaDeleteClick()}
        />
      )}
    </div>
  );
};

export const EditableImageItem = (props) => {
  const { getUserUID } = useContext(UserDataContext);
  const [mediaURL, setMediaURL] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  let userUID = getUserUID();

  const [deleteActive, setDeleteActive] = useState(props.showMediaDelete);

  useEffect(() => {
    setDeleteActive(props.showMediaDelete);
  }, [props.refresh]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(async () => {
    try {
      const profileImageUri = await firebase.storage().ref(props.url);
      setMediaURL(await profileImageUri.getDownloadURL());
    } catch (e) {
      console.error(e);
    }
  }, []);

  //Method called when the user tries to delete a media item
  const handleMediaDeleteClick = async () => {
    deleteMediaItem(props.idNum);
    await deleteMediaFromFBStorage();
    await updateMediaArrayDB();
    props.callbackRefresh();
  };

  //Method that takes a storage reference and deletes the file in that reference
  const deleteMediaFromFBStorage = async () => {
    let mediaName = firebase.storage().ref(props.url);
    await mediaName
      .delete()
      .then(() => {
        console.log(`${mediaName}has been deleted successfully.`);
      })
      .catch((e) => console.log("Failed to delete media - " + e));
  };

  //Method that updates the media array in the databased
  const updateMediaArrayDB = async () => {
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
        console.warn("Media Array Updated");
      });
  };

  return (
    <div className="mediaContainer">
      <img onClick={() => openModal()} src={mediaURL} />
      {deleteActive && (
        <MdDelete
          size={40}
          color={"#C41E3A"}
          className="mediaDeleteIcon"
          onClick={() => handleMediaDeleteClick()}
        />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal()}
        contentLabel="Example Modal"
        overlayClassName="ModalOverlay"
        className="MediaModal"
      >
        <MdClose
          className="closeIcon"
          size={25}
          color={"white"}
          onClick={() => closeModal()}
        />
        <div
          className="modalContainer"
          onClick={window.innerWidth > 600 ? () => closeModal() : null}
        >
          <img className="modalMedia" src={mediaURL} onClick={null} />
        </div>
      </Modal>
    </div>
  );
};
