import React, {useEffect} from 'react';
import './SocialsScreen.css';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';
import WebFont from 'webfontloader';

const SocialsScreen = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);
  return (
    <div className="socialScreenContainer">
      <p className='socialScreenFormHeader'>Enter your Social Media Handles</p>
      <p className='socialScreenHeadlineHeader'>Some awsome tagline</p>
      <form>
        <div className="socialsTextInputContainer">
          <FaInstagram size={25} color={'#3eb489'} />
          <input
            className="socialScreenTextInput"
            placeholder='Enter Instagram Handle'
            type="text"
            id="Instagram"
          />
        </div>
        <div className="socialsTextInputContainer">
          <FaTwitter size={25} color={'#3eb489'} />
          <input
            className="socialScreenTextInput"
            placeholder='Enter Twitter Handle'
            type="text"
            id="Twitter"
          />
        </div>
        <div className="socialsTextInputContainer">
          <MdEmail size={25} color={'#3eb489'} />
          <input
            className="socialScreenTextInput"
            placeholder='Note: Email they sign up with will be here by defualt'
            type="text"
            id="Email"
          />
        </div>

        <div className="socialsTextInputContainer">
          <BsLink45Deg size={25} color={'#3eb489'} />
          <input
            className="socialScreenTextInput"
            placeholder='Enter Link a of Your Choice'
            type="text"
            id="Link"
          />
        </div>
        <button className="socialsScreenNextButton">Next</button>
      </form>
    </div>
  );
};

export default SocialsScreen;
