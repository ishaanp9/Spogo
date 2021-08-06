import React, { useState, useEffect, useContext } from "react";
import "./CreateProfile.css";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import WebFont from 'webfontloader';
import {AuthContext} from '../../../AuthProvider';

const CreateProfile = () => {

  const { logout } = useContext(AuthContext);

  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [accomplishmentModalOpen, setAccomplishmentModalOpen] = useState(false);
  const [measurableModalOpen, setMeasurableModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");

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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setCurrentMonth(monthNames[monthNumber]);
  };

  return (
    <div>
      <h1 onClick={() => setExperienceModalOpen(true)}>Experience</h1>
      <h2 onClick={() => setAccomplishmentModalOpen(true)}>Accomplishment</h2>
      <h3 onClick={() => setMeasurableModalOpen(true)}>Measurable</h3>
      <button style={{marginTop: 20}} type="button" onClick={() => logout()}>
        Logout
      </button>

      

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

                    <select className="modalDatePicker" required name={"Month"}>
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
                    <select className="modalDatePicker" required name={"Year"}>
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
                    <select className="modalDatePicker" required name={"Month"}>
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
                    <select className="modalDatePicker" required name={"Year"}>
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
                    <select className="modalDatePicker" required name={"Month"}>
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
                    <select className="modalDatePicker" required name={"Year"}>
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
    </div>
  );
};

export default CreateProfile;
