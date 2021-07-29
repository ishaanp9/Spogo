import React, { useState, useEffect } from 'react';
import './VideoItem.css';
import ReactPlayer from 'react-player';
import firebase from '../../../firebase';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { black } from 'jest-matcher-utils/node_modules/chalk';
import { nonEmptyArray } from 'check-types';

export const VideoItem = (props) => {
  const [paused, setPaused] = useState(true);
  const [mediaURL, setMediaURL] = useState('');

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
          height:
            window.innerWidth < 600
              ? window.innerHeight / 6
              : window.innerHeight / 5,
          width:
            window.innerWidth < 600
              ? window.innerWidth / 2
              : window.innerWidth / 6,
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
        style={{
          height:
            window.innerWidth < 600
              ? window.innerHeight / 6
              : window.innerHeight / 5,
          width:
            window.innerWidth < 600
              ? window.innerWidth / 2
              : window.innerWidth / 6,
          marginRight: window.innerWidth / 150,
          marginTop: window.innerHeight / 80,
        }}
      />
      {/* These are the same modals but the first one is for 
      the website, the last one is for the mobile view */}
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
          color={'black'}
          onClick={() => closeModal()}
        />
        <div className="modalContainer">
          <img className="modalMedia" src={mediaURL} />
        </div>
      </Modal>
    </div>
  );
};
