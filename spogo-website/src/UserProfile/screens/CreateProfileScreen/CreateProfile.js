import React, { useState, useEffect } from 'react';
import './CreateProfile.css';
import Modal from 'react-modal';
import WebFont from 'webfontloader';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdMail, MdStar, MdLocationOn, MdClose } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';
import BlankProfile from '../ProfileScreen/blank_profile.png';
import { MixpanelConsumer } from 'react-mixpanel';
import {AuthContext} from '../../../AuthProvider';

const CreateProfile = () => {

  const { logout } = useContext(AuthContext);

  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [accomplishmentModalOpen, setAccomplishmentModalOpen] = useState(false);
  const [measurableModalOpen, setMeasurableModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    getCurrentDate();
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Open Sans', 'Public Sans'],
      },
    });
  }, []);

  const getCurrentDate = () => {
    let monthNumber = new Date().getMonth();
    setCurrentYear(new Date().getFullYear());
    let monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    setCurrentMonth(monthNames[monthNumber]);
  };

  return (
    <div>
      <>
        <div className="createScreenProfileHeader">
          <div className="createScreenProfileImageContainer">
            <img className="createScreenProfileImage" src={BlankProfile} />
            {/* {profileImage === '' || profileImage === undefined ? (
              <img className="profileImage" src={BlankProfile} />
            ) : (
              <img className="profileImage" src={profileImage} />
            )} */}
          </div>
          <div className="createScreenProfileTextContainer">
            <div className="createScreenNameSportTextContainer">
              <h1 className="createScreenWebsiteUserName">Ishaan Puri</h1>
              <h2 className="createScreenWebsiteSportPositionText">
                Basketball - PG
                {/* {position === '' ? sport : sport + ' - ' + position} */}
              </h2>
            </div>

            <div className="createScreenLocationIconTextContainer">
              <MdLocationOn color={'#EA4335'} size={20} />
              <h3 className="createScreenLocationText">Seattle, WA</h3>
            </div>

            <div className="createScreenSocialIconsRow">
              <FaInstagram
                className="createScreenSocialIcon"
                // onClick={() =>
                //   // window.location.replace("www.instagram.com/" + instagram)
                //   {
                //     mixpanel.track(
                //       'Profile Icons Pressed by External Visitor',
                //       { 'Profile Icon': 'Instagram' }
                //     );
                //     window.open('https://instagram.com/' + instagram);
                //   }
                // }
                size={25}
                color={'#E1306C'}
              />

              <FaTwitter
                className="createScreenSocialIcon"
                // onClick={() =>
                //   // window.location.replace("www.instagram.com/" + instagram)
                //   {
                //     mixpanel.track(
                //       'Profile Icons Pressed by External Visitor',
                //       { 'Profile Icon': 'Twitter' }
                //     );
                //     window.open('https://twitter.com/' + twitter);
                //   }
                // }
                size={25}
                color={'#1DA1F2'}
              />

              <MdMail
                className="createScreenSocialIcon"
                // onClick={() => {
                //   mixpanel.track(
                //     'Profile Icons Pressed by External Visitor',
                //     { 'Profile Icon': 'Email' }
                //   );
                //   window.open('mailto:' + email);
                // }}
                // onClick={() =>
                //   // window.location.replace("www.instagram.com/" + instagram)
                //   window.open("https://instagram.com/" + instagram)
                // }
                size={25}
                color={'#5D4D4A'}
              />

              <BsLink45Deg
                className="createScreenSocialIcon"
                // onClick={() => setWildcardLinkModalOpen(true)}
                size={25}
                color={'#ffae42'}
              />
            </div>
          </div>
        </div>
        <div>
          <p></p>
        </div>
        <div className="createScreenBioContainer">
          <h1>Bio</h1>
          <hr
            className="createScreenComponentHeaderDivider"
            color="lightgrey"
            size="1"
          />
          <p>This is an empty bio, edit as you see fit.</p>
        </div>
      </>
      <div className="createScreenProfileItemListContainer">
        <h1 className="createScreenProfileItemListHeader">Highlights</h1>
        <hr
          className="createScreenComponentHeaderDivider"
          size="1"
          color="lightgrey"
        />
        <ul
          className="createScreenVideoItemArrayList"
          // style={{ width: window.innerWidth }}
        >
          {/* {thisMediaArray.map((item) => {
            if (item.media === 'photo') {
              return <ImageItem url={item.url} />;
            } else {
              return <VideoItem url={item.url} />;
            }
          })} */}
        </ul>
      </div>
      <div className="createScreenProfileItemListContainer">
        <h1 className="createScreenProfileItemListHeader" onClick={() => setExperienceModalOpen(true)}>Experiences</h1>
        <hr className="createScreenComponentHeaderDivider" size="1" color="lightgrey" />

        {/* {ShowMoreShowLess('Experience')}
          {thisExperienceArray.length < 3 ? (
            <hr
              className="componentBottomDivider"
              size="1"
              color="lightgrey"
              style={{ marginBottom: 20 }}
            />
          ) : (
            <hr className="componentBottomDivider" size="1" color="lightgrey" />
          )} */}
        {/* {thisExperienceArray.length > 3 ? (
            <button
              className={'seeMoreSeeLessItemButton'}
              onClick={() =>
                setshowMoreShowLessButtonExperience(
                  !showMoreShowLessButtonExperience
                )
              }
              type="button"
            >
              {showMoreShowLessButtonTextExperience}
            </button>
          ) : null} */}
      </div>
      )
      <div className="createScreenProfileItemListContainer">
        <h1 className="createScreenProfileItemListHeader" onClick={() => setAccomplishmentModalOpen(true)}>Accomplishments</h1>
        <hr className="createScreenComponentHeaderDivider" size="1" color="lightgrey" />

        {/* {ShowMoreShowLess('Accoplishment')} */}
        {/* {thisTrophyArray.length < 3 ? (
            <hr
              className="componentBottomDivider"
              size="1"
              color="lightgrey"
              style={{ marginBottom: 20 }}
            />
          ) : (
            <hr className="componentBottomDivider" size="1" color="lightgrey" />
          )} */}
        {/* {thisTrophyArray.length > 3 ? (
            <button
              className={'seeMoreSeeLessItemButton'}
              onClick={() =>
                setshowMoreShowLessButtonAccoplishment(
                  !showMoreShowLessButtonAccoplishment
                )
              }
              type="button"
            >
              {showMoreShowLessButtonTextAccoplishment}
            </button>
          ) : null} */}
      </div>
      <div className="createScreenProfileItemListContainer">
        <h1 className="createScreenProfileItemListHeader" onClick={() => setMeasurableModalOpen(true)}>Measurables</h1>
        <hr className="createScreenComponentHeaderDivider" size="1" color="lightgrey" />

        {/* {ShowMoreShowLess('Measurables')} */}
        {/* {thisMeasurableArray.length < 3 ? (
          <hr
            className="componentBottomDivider"
            size="1"
            color="lightgrey"
            style={{ marginBottom: 20 }}
          />
        ) : (
          <hr className="componentBottomDivider" size="1" color="lightgrey" />
        )} */}
        {/* {thisMeasurableArray.length > 3 ? (
          <button
            className={'seeMoreSeeLessItemButton'}
            onClick={() =>
              setshowMoreShowLessButtonMeasurables(
                !showMoreShowLessButtonMeasurables
              )
            }
            type="button"
          >
            {showMoreShowLessButtonTextMeasurables}
          </button>
        ) : null} */}
      </div>
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Experience Modal */}
      <Modal
        isOpen={experienceModalOpen}
        onRequestClose={() => setExperienceModalOpen(false)}
        className="experienceModal"
        overlayClassName="itemAddModalOverlay"
      >
        <div className="expModalContainer">
          <div className="modalHeaderContainer">
            <p>Add Experience</p>
            <MdClose
              style={{ cursor: 'pointer' }}
              onClick={() => setExperienceModalOpen(false)}
              size={20}
              color={'grey'}
            />
          </div>
          <div>
            <form>
              <p className="textInputHeaders">Title</p>
              <input
                required
                className="modalTextInputItems"
                type="text"
                maxLength="100"
              />
              <p className="textInputHeaders">Team</p>
              <input
                required
                className="modalTextInputItems"
                type="text"
                maxLength="100"
              />
              <div className="modalDatePickerContainer">
                <div className="expModalDatePickerItemContainer">
                  <p className="textInputHeaders">Start Date</p>
                  <div className="datePickerRow">
                    <select className="modalDatePicker" required name={'Month'}>
                      <option selected hidden>
                        Month
                      </option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                    {/* <div style={{width: '0.5%'}}></div> */}
                    <div className="datePickerRowMiddleDivider"></div>
                    <select className="modalDatePicker" required name={'Year'}>
                      <option selected hidden>
                        Year
                      </option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                      <option>2018</option>
                      <option>2017</option>
                      <option>2016</option>
                      <option>2015</option>
                      <option>2014</option>
                      <option>2013</option>
                      <option>2012</option>
                      <option>2011</option>
                      <option>2010</option>
                      <option>2009</option>
                      <option>2008</option>
                      <option>2007</option>
                      <option>2006</option>
                      <option>2005</option>
                      <option>2004</option>
                      <option>2003</option>
                      <option>2002</option>
                      <option>2001</option>
                      <option>2000</option>
                    </select>
                  </div>
                </div>
                <div style={{ width: 20 }}></div>
                <div className="expModalDatePickerItemContainer">
                  <p className="textInputHeaders">End Date</p>
                  <div className="datePickerRow">
                    <select className="modalDatePicker" required name={'Month'}>
                      <option selected hidden>
                        {currentMonth}
                      </option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                    <div className="datePickerRowMiddleDivider"></div>
                    <select className="modalDatePicker" required name={'Year'}>
                      <option selected hidden>
                        {currentYear}
                      </option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                      <option>2018</option>
                      <option>2017</option>
                      <option>2016</option>
                      <option>2015</option>
                      <option>2014</option>
                      <option>2013</option>
                      <option>2012</option>
                      <option>2011</option>
                      <option>2010</option>
                      <option>2009</option>
                      <option>2008</option>
                      <option>2007</option>
                      <option>2006</option>
                      <option>2005</option>
                      <option>2004</option>
                      <option>2003</option>
                      <option>2002</option>
                      <option>2001</option>
                      <option>2000</option>
                    </select>
                  </div>
                  {/* <p className="presentTimeText">
                    Currently doing this?{" "}
                    <span onClick={() => getCurrentDate()}>Click here.</span>
                  </p> */}
                </div>
              </div>
              <p className="textInputHeaders">Description</p>
              <textarea
                style={{ resize: 'none' }}
                className="modalTextInputItems"
                rows={5}
                name={'description'}
              />
            </form>
          </div>
          <div>
            <button className="addEditItemModalButton" type={'button'}>
              Create
            </button>
          </div>
        </div>
      </Modal>
      {/* Experience Modal */}
      {/* Accomplishment Modal */}
      <Modal
        isOpen={accomplishmentModalOpen}
        onRequestClose={() => setAccomplishmentModalOpen(false)}
        className="accomplishmentModal"
        overlayClassName="itemAddModalOverlay"
      >
        <div>
          <div className="modalHeaderContainer">
            <p>Add Accomplishment</p>
            <MdClose
              style={{ cursor: 'pointer' }}
              onClick={() => setAccomplishmentModalOpen(false)}
              size={20}
              color={'grey'}
            />
          </div>
          <div>
            <form>
              <p className="textInputHeaders">Title</p>
              <input
                placeholder="Ex: MVP, State Title, Help me "
                required
                className="modalTextInputItems"
                type="text"
                maxLength="100"
              />
              <div className="modalDatePickerContainer">
                <div className="accomplishmentMeasurableDatePickerItemContainer">
                  <p className="textInputHeaders">Date Received</p>
                  <div className="datePickerRow">
                    <select className="modalDatePicker" required name={'Month'}>
                      <option selected hidden>
                        Month
                      </option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                    {/* <div style={{width: '0.5%'}}></div> */}
                    <div className="datePickerRowMiddleDivider"></div>
                    <select className="modalDatePicker" required name={'Year'}>
                      <option selected hidden>
                        Year
                      </option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                      <option>2018</option>
                      <option>2017</option>
                      <option>2016</option>
                      <option>2015</option>
                      <option>2014</option>
                      <option>2013</option>
                      <option>2012</option>
                      <option>2011</option>
                      <option>2010</option>
                      <option>2009</option>
                      <option>2008</option>
                      <option>2007</option>
                      <option>2006</option>
                      <option>2005</option>
                      <option>2004</option>
                      <option>2003</option>
                      <option>2002</option>
                      <option>2001</option>
                      <option>2000</option>
                    </select>
                  </div>
                  {/* <p className="presentTimeText">
                    Currently doing this? <span span onClick={() => getCurrentDate()}>Click here.</span>
                  </p> */}
                </div>
              </div>
              <p className="textInputHeaders">Description</p>
              <textarea
                style={{ resize: 'none' }}
                className="modalTextInputItems"
                rows={5}
                name={'description'}
              />
            </form>
          </div>
          <div>
            <button className="addEditItemModalButton" type={'button'}>
              Create
            </button>
          </div>
        </div>
      </Modal>
      {/* Accomplishment Modal */}
      {/* Measurable Modal */}
      <Modal
        isOpen={measurableModalOpen}
        onRequestClose={() => setMeasurableModalOpen(false)}
        className="measurableModal"
        overlayClassName="itemAddModalOverlay"
      >
        <div>
          <div className="modalHeaderContainer">
            <p>Add Measurable</p>
            <MdClose
              style={{ cursor: 'pointer' }}
              onClick={() => setMeasurableModalOpen(false)}
              size={20}
              color={'grey'}
            />
          </div>
          <div>
            <form>
              <p className="textInputHeaders">Title</p>
              <input
                required
                placeholder="Ex: 40 time, Height, GPA"
                className="modalTextInputItems"
                type="text"
                maxLength="100"
              />
              <p className="textInputHeaders">Value</p>
              <input
                placeholder="Ex: 4.50, 6'1, 3.5"
                className="modalTextInputItems"
                rows={5}
                name={'value'}
              />
            </form>
          </div>
          <div>
            <button className="addEditItemModalButton" type={'button'}>
              Create
            </button>
          </div>
        </div>
      </Modal>
      {/* Measurable Modal */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}
      {/* Add Item Modals */}

      <button style={{marginTop: 20}} type="button" onClick={() => logout()}>
    </div>
  );
};

export default CreateProfile;
