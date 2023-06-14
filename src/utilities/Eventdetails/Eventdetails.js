import React, { useEffect, useState } from "react";
import "./Eventdetails.css";

const Eventdetails = ({ eventDetails, stateHandle_Event_Organiser_Preview, setStateHandle_Event_Organiser_Preview }) => {

  const [handleFormInput, setHandleFormInput] = useState([]);
  const [checkReqierdField, setCheckReqierdField] = useState(!true);

  eventDetails(handleFormInput);

  const onSubmit = (e) => {
    e.preventDefault()
    setCheckReqierdField(true)

    if (handleFormInput?.country &&
      handleFormInput?.pincode &&
      handleFormInput?.city &&
      handleFormInput?.location &&
      handleFormInput?.eventWebsiteUrl &&
      handleFormInput?.longDescription &&
      handleFormInput?.Short_description &&
      handleFormInput?.event &&
      handleFormInput?.mode &&
      handleFormInput?.engagementType &&
      handleFormInput?.eventType &&
      handleFormInput?.audienceType &&
      handleFormInput?.startdate &&
      handleFormInput?.enddate &&
      handleFormInput?.endtime &&
      handleFormInput?.starttime &&
      handleFormInput?.audienceSize &&
      handleFormInput?.category) {
      setStateHandle_Event_Organiser_Preview(p => { p.event = false; p.organise = true; p.preview = false; return { ...p } })
    }
  };

  const handleChangeEventDetailsForm = (e) => {
    setHandleFormInput(prev => {
      // if (e.target.name === 'startdate' || e.target.name === 'enddate') {
      //   console.log('handleFormInput?.startdate',( prev?.startdate ),'###',( prev?.enddate))

      //   if (prev?.startdate >= prev?.enddate) {
      //     alert("Start Date Should Greater Then End Date")
      //   }
      // }
      prev[e.target.name] = e.target.value
      return { ...prev }
    })
  }

  // useEffect(() => {
  //   localStorage.setItem('handleFormInput', JSON.stringify(handleFormInput))

  // }, [handleFormInput])


  // useEffect(() => {
  //   const handleFormInputFromLocal = JSON.parse(localStorage.getItem('handleFormInput'))
  //   console.log("useEffect",handleFormInputFromLocal)
  //   setHandleFormInput(() => handleFormInputFromLocal)
  //   // alert("ksjdhfjshd")
  // }, [])



  return (
    <div className="listevent-container">
      <div>
        <div>
          <form className="event-form">
            <div className="input-details">
              <label>Title of Event</label>
              <input
                name="event"
                type="text"
                maxLength={50}
                // value={handleFormInput?.event}
                placeholder="Enter the title of event"
                onChange={(e) => { handleChangeEventDetailsForm(e) }}
                required
              />
              {
                checkReqierdField &&
                !handleFormInput?.event && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
              }
            </div>

            <div className="input-details">
              <label>Short description Of the event</label>
              <textarea
                name="Short_description"
                maxLength={200}
                placeholder="A very short one line description of the event here.."
                onChange={(e) => { handleChangeEventDetailsForm(e) }}
                required
              />
              {
                checkReqierdField &&
                !handleFormInput?.Short_description && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
              }
            </div>

            <div className="input-details">
              <label>Detail description of the event</label>
              <textarea
                maxLength={500}
                name="longDescription"
                placeholder="Type here"
                required
                onChange={(e) => {
                  handleChangeEventDetailsForm(e)
                }}
              />
              {
                checkReqierdField &&
                !handleFormInput?.longDescription && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
              }
            </div>

            <div className="input-details">
              <label>Event website URL</label>
              <input
                name="eventWebsiteUrl"
                type="text"
                required
                onChange={(e) => {
                  handleChangeEventDetailsForm(e)
                }}
              />
              {
                checkReqierdField &&
                !handleFormInput?.eventWebsiteUrl && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
              }
            </div>

            <div className="double">
              <div className="input-details">
                <label>Mode</label>
                <select
                  name="mode"
                  required
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                >
                  <option>Select</option>
                  <option>Online Event</option>
                  <option>Offline Event</option>
                </select>
                {
                  checkReqierdField &&
                  !handleFormInput?.mode && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>

              <div className="input-details">
                <label>Engagement Team</label>
                <select
                  name="engagementType"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                >
                  <option>Select</option>
                  <option>Online Event</option>
                  <option>Offline Event</option>
                </select>
                {
                  checkReqierdField &&
                  !handleFormInput?.engagementType && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label>Event Type</label>
                <select
                  name="eventType"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                >
                  <option>Select</option>
                  <option>Employee engagement</option>
                  <option> Event</option>
                </select>
                {
                  checkReqierdField &&
                  !handleFormInput?.eventType && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>

              <div className="input-details">
                <label> Audience Type</label>
                <select
                  name="audienceType"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                >
                  <option>Select</option>
                  <option> Student</option>
                  <option> Business Man</option>
                </select>
                {
                  checkReqierdField &&
                  !handleFormInput?.audienceType && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label>Audience Size</label>
                <select
                  name="audienceSize"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                >
                  <option>Select</option>
                  <option> 100</option>
                  <option> 200</option>
                  <option> 400</option>
                  <option> 500</option>
                  <option> 700</option>
                  <option> 1000</option>
                </select>
                {
                  checkReqierdField &&
                  !handleFormInput?.audienceSize && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>

              <div className="input-details">
                <label>Cateogary</label>
                <select
                  name="category"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                >
                  <option>Select</option>
                  <option>Business </option>
                  <option> Musician</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Automobile">Automobile</option>
                  <option value="Banking">Banking </option>
                  <option value="Business">Business</option>
                  <option value="Coaching">Coaching</option>
                  <option value="Communication">Communication</option>
                  <option value="Design Thinking">Design Thinking</option>
                  <option value="Education">Education</option>
                  <option value="Finance">Finance</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Health">Health</option>
                  <option value="Human resource">Human resource </option>
                  <option value="Innovation">Innovation </option>
                  <option value="Leadership">Leadership</option>
                  <option value="LGBTQ">LGBTQ</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Oil Gas">Oil Gas</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Presentation Skill">Presentation Skill</option>
                  <option value="Retails">Retails</option>
                  <option value="Sales"> Sales</option>
                  <option value="Soft Skill">Soft Skill</option>
                </select>
                {
                  checkReqierdField &&
                  !handleFormInput?.category && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label for="start">Start Date:</label>
                <input onChange={(e) => {
                  handleChangeEventDetailsForm(e)
                }} type="date" id="start" name="startdate"
                  value={handleFormInput?.startdate}
                  min={handleFormInput?.startdate <= handleFormInput?.enddate}>
                </input>
              {
                checkReqierdField &&
                !handleFormInput?.location && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
              }
              </div>
              <div className="input-details">
                <label for="appt">Start Time:</label>
                <input onChange={(e) => {
                  handleChangeEventDetailsForm(e)
                }} type="time" id="appt" name="starttime"
                  // min="09:00" max="18:00"
                   required />
                  {
                    checkReqierdField &&
                    !handleFormInput?.location && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                  }
              </div>
            </div>
            <div className="double">
              <div className="input-details">
                <label for="start">End Date:</label>
                <input onChange={(e) => {
                  handleChangeEventDetailsForm(e)
                }} type="date" id="start" name="enddate"
                  // value="2018-07-22"
                  max={handleFormInput?.enddate >= handleFormInput?.startdate}>
                </input>
              {
                checkReqierdField &&
                !handleFormInput?.location && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
              }
              </div>
              <div className="input-details">
                <label for="appt">End Time:</label>
                <input onChange={(e) => {
                  handleChangeEventDetailsForm(e)
                }} type="time" id="appt" name="endtime"
                  // min="09:00" max="18:00" 
                  required />
                  {
                    checkReqierdField &&
                    !handleFormInput?.location && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                  }
              </div>
            </div>

            <div className="input-details">
              <label>Location</label>
              <input
                name="location"
                type="text"
                placeholder="Type here"
                required
                onChange={(e) => {
                  handleChangeEventDetailsForm(e)
                }}
              />
              {
                checkReqierdField &&
                !handleFormInput?.location && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
              }
            </div>

            <div className="double">
              <div className="input-details">
                <label>City</label>
                <input
                  name="city"
                  type="text"
                  placeholder="Type here"
                  required
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                /> {
                  checkReqierdField &&
                  !handleFormInput?.city && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>

              <div className="input-details">
                <label>Pin Code</label>
                <input
                  name="pincode"
                  type="text"
                  placeholder="Type here"
                  required
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                />
                {
                  checkReqierdField &&
                  !handleFormInput?.pincode && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>

              <div className="input-details">
                <label>Country</label>
                <input
                  name="country"
                  type="text"
                  placeholder="Type here"
                  required
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e)
                  }}
                />
                {
                  checkReqierdField &&
                  !handleFormInput?.country && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
                }
              </div>
            </div>

            {/* {stateHandle_Event_Organiser_Preview?.event === true ? ( */}
            <div className="card-3 next-button">
              <button type="submit" onClick={onSubmit}>
                Next
              </button>
            </div>
            {/* ) : (
              ""
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Eventdetails;