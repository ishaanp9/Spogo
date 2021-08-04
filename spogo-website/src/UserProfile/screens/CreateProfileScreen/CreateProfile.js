import React, {useState} from "react";
import './CreateProfile.css'
import Modal from "react-modal";
import { MdClose } from "react-icons/md";


const CreateProfile = () => {
    const [experienceModalOpen, setExperienceModalOpen] = useState(false);
    const [accomplishmentModalOpen, setAccomplishmentModalOpen] = useState(false);
    const [measurableModalOpen, setMeasurableModalOpen] = useState(false);

    const getCurrentDate = () => {
      let monthNumber = (new Date().getMonth());
      let yearNumber = (new Date().getFullYear())
      let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let monthName = monthNames[monthNumber];
      console.log(monthName + " " + yearNumber)
    }

  return (
    <div>
      <h1 onClick={() => setExperienceModalOpen(true)}>Experience</h1>
      <h2 onClick={() => setAccomplishmentModalOpen(true)}>Accomplishment</h2>
      <h3 onClick={() => setMeasurableModalOpen(true)}>Measurable</h3>

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
              style={{ cursor: "pointer" }}
              onClick={() => setExperienceModalOpen(false)}
              size={20}
              color={"grey"}
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
                      <option>Year</option>
                    </select>
                  </div>
                </div>
                <div style={{ width: 20 }}></div>
                <div className="expModalDatePickerItemContainer">
                  <p className="textInputHeaders">End Date</p>
                  <div className="datePickerRow">
                    <select className="modalDatePicker" required name={"Month"}>
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
                  <p className="presentTimeText">
                    Currently doing this? <span onClick={() => getCurrentDate()}>Click here.</span>
                  </p>
                </div>
              </div>
              <p className="textInputHeaders">Description</p>
              <textarea
                style={{ resize: "none" }}
                className="modalTextInputItems"
                rows={5}
                name={"description"}
              />
            </form>
          </div>
          <div>
            <button className="addEditItemModalButton" type={"button"}>
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
              style={{ cursor: "pointer" }}
              onClick={() => setAccomplishmentModalOpen(false)}
              size={20}
              color={"grey"}
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
              <div className="modalDatePickerContainer">
                <div className="accomplishmentMeasurableDatePickerItemContainer">
                  <p className="textInputHeaders">Date Received</p>
                  <div className="datePickerRow">
                    <select className="modalDatePicker" required name={"Month"}>
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
                      <option>Year</option>
                    </select>
                  </div>
                  {/* <p className="presentTimeText">
                    Currently doing this? <span span onClick={() => getCurrentDate()}>Click here.</span>
                  </p> */}
                </div>
              </div>
              <p className="textInputHeaders">Description</p>
              <textarea
                style={{ resize: "none" }}
                className="modalTextInputItems"
                rows={5}
                name={"description"}
              />
            </form>
          </div>
          <div>
            <button className="addEditItemModalButton" type={"button"}>
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
              style={{ cursor: "pointer" }}
              onClick={() => setMeasurableModalOpen(false)}
              size={20}
              color={"grey"}
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
              <p className="textInputHeaders">Description</p>
              <textarea
                style={{ resize: "none" }}
                className="modalTextInputItems"
                rows={5}
                name={"description"}
              />
            </form>
          </div>
          <div>
            <button className="addEditItemModalButton" type={"button"}>
              Create
            </button>
          </div>
        </div>
      </Modal>
      {/* Measurable Modal */}

    </div>
  );
};

export default CreateProfile;
