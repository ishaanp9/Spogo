import React, { useState, useEffect } from 'react';
import "./EditableMediaItem.css";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import firebase from "../../../firebase";

export const EditableVideoItem = (props) => {
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
    <div className="mediaContainer">
      <video src={mediaURL} controls>
        {/* <source src={mediaURL} type="video/mp4"/> */}
      </video>
    </div>
  );
};

export const EditableImageItem = (props) => {
  const [paused, setPaused] = useState(true);
  const [mediaURL, setMediaURL] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

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

  return (
    <div className="mediaContainer">
      <img
        onClick={() => openModal()}
        src={mediaURL}
      />
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
