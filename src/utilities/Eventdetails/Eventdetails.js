import React, { useEffect, useState, useRef } from "react";
import "./Eventdetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Eventdetails = ({
  eventDetails,
  stateHandle_Event_Organiser_Preview,
  setStateHandle_Event_Organiser_Preview,
}) => {
  const [handleFormInput, setHandleFormInput] = useState([]);
  const [checkReqierdField, setCheckReqierdField] = useState(!true);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const [isValid, setIsValid] = useState(true);
  const [isValid2, setIsValid2] = useState(true);

  const { id } = useParams();

  eventDetails(handleFormInput);
  var editData = {};
  var editOrgData = {};

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: `https://api.speakerore.com/api/getsingleevent/${id}`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data.savedEvent);
          editData.event = res.data.savedEvent?.TitleOfTheEvent;
          editData.Short_description =
            res.data.savedEvent?.ShortDescriptionOfTheEvent;
          editData.longDescription =
            res.data.savedEvent?.DetailedDescriptionOfTheEvent;
          editData.eventWebsiteUrl = res.data.savedEvent?.EventWebsiteUrl;
          editData.mode = res.data.savedEvent?.Mode;
          editData.engagementType = res.data.savedEvent?.EngagementTerm;
          editData.eventType = res.data.savedEvent?.EventType;
          editData.audienceType = res.data.savedEvent?.AudienceType;
          editData.audienceSize = res.data.savedEvent?.AudienceSize;
          editData.category = res.data.savedEvent?.Category;
          editData.startdate = convertDate(
            res.data.savedEvent?.EventStartDateAndTime
          );
          editData.enddate = convertDate(
            res.data.savedEvent?.EventEndDateAndTime
          );
          editData.starttime = convertTime(
            res.data.savedEvent?.EventStartDateAndTime
          );
          editData.endtime = convertTime(
            res.data.savedEvent?.EventEndDateAndTime
          );
          editData.location = res.data.savedEvent?.Location;
          editData.city = res.data.savedEvent?.City;
          editData.pincode = res.data.savedEvent?.Pincode;
          editData.country = res.data.savedEvent?.Country;
          editData.contactEmailId = res.data.savedEvent?.ContactEmail;
          editData.exclusive = res.data.savedEvent?.isSpeakerOreExclusive;
          editOrgData.organizerName = res.data.savedEvent?.OrganizerName;
          editOrgData.organizerEmail = res.data.savedEvent?.OrganizerEmail;
          editOrgData.organizerContactNumber = String(
            res.data.savedEvent?.OrganizerContactNumber
          );
          editOrgData.tags = res.data.savedEvent?.Tags;
          console.log(editOrgData.tags);
          setHandleFormInput(editData);
          localStorage.setItem("handleFormInput", JSON.stringify(editData));
          localStorage.setItem(
            "handleOrganizerDetails",
            JSON.stringify(editOrgData)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setCheckReqierdField(true);

    if (
      handleFormInput?.country &&
      handleFormInput?.event &&
      handleFormInput?.pincode &&
      handleFormInput?.city &&
      handleFormInput?.location &&
      // handleFormInput?.eventWebsiteUrl &&
      handleFormInput?.longDescription &&
      handleFormInput?.Short_description &&
      handleFormInput?.mode &&
      handleFormInput?.engagementType &&
      handleFormInput?.eventType &&
      handleFormInput?.audienceType &&
      handleFormInput?.startdate &&
      handleFormInput?.enddate &&
      handleFormInput?.endtime &&
      handleFormInput?.starttime &&
      handleFormInput?.audienceSize &&
      handleFormInput?.category
    ) {
      setStateHandle_Event_Organiser_Preview((p) => {
        p.event = false;
        p.organise = true;
        p.preview = false;
        return { ...p };
      });
    }
  };

  const handleChangeEventDetailsForm = (e) => {
    let tempprev;
    if (e.target.name === "exclusive") {
      // setExclusive(!exclusive)
      setHandleFormInput((prev) => {
        prev[e.target.name] = !handleFormInput?.exclusive;
        // console.log('exclusive', prev)
        tempprev = prev;
        localStorage.setItem("handleFormInput", JSON.stringify(tempprev));
        return { ...prev };
      });
    } else if (e.target.name === "eventWebsiteUrl") {
      setHandleFormInput((prev) => {
        var input = e.target.value.trim();
        var linkPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        const isValidSite = linkPattern.test(input);
        setIsValid(isValidSite);
        prev[e.target.name] = e.target.value;
        tempprev = prev;
        // localStorage.setItem('handleOrganizerDetails', JSON.stringify(tempprev))
        return { ...prev };
      });
    } else if (e.target.name === "contactEmailId") {
      setHandleFormInput((prev) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailPattern.test(e.target.value);
        setIsValid2(isValidEmail);
        prev[e.target.name] = e.target.value;
        tempprev = prev;
        // localStorage.setItem('handleOrganizerDetails', JSON.stringify(tempprev))
        return { ...prev };
      });
    } else {
      setHandleFormInput((prev) => {
        prev[e.target.name] = e.target.value;
        tempprev = prev;
        return { ...prev };
      });
      localStorage.setItem("handleFormInput", JSON.stringify(tempprev));
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const registerRef = (ref, index) => {
    inputRefs.current[index] = ref;
  };

  useEffect(() => {
    let handleFormInputFromLocal = null;
    inputRefs.current[0].focus();
    try {
      handleFormInputFromLocal = JSON.parse(
        localStorage.getItem("handleFormInput")
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // alert('Error parsing JSON:',error)
    }
    if (handleFormInputFromLocal !== null) {
      setHandleFormInput(() => handleFormInputFromLocal);
    }
  }, []);

  const convertDate = (date) => {
    const dateObject = date.split("T");
    return dateObject[0];
  };

  const convertTime = (date) => {
    let time;
    const dateObject = date.split("T");
    time = dateObject[1].slice(0, 5);
    return time;
  };

  console.log(handleFormInput);
  console.log(handleFormInput?.endtime);

  return (
    <div className="listevent-container">
      <div>
        <div>
          <form className="event-form">
            <div className="input-details">
              <label>Title of Event</label>
              <input
                ref={(ref) => registerRef(ref, 0)}
                onKeyDown={(event) => handleKeyDown(event, 0)}
                name="event"
                type="text"
                maxLength={50}
                value={handleFormInput?.event}
                placeholder="Enter the title of event"
                onChange={(e) => {
                  handleChangeEventDetailsForm(e);
                }}
                required
              />
              {checkReqierdField && !handleFormInput?.event && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  Above field is required{" "}
                </p>
              )}
            </div>

            <div className="input-details">
              <label>Short description Of the event</label>
              <textarea
                ref={(ref) => registerRef(ref, 1)}
                onKeyDown={(event) => handleKeyDown(event, 1)}
                name="Short_description"
                value={handleFormInput?.Short_description}
                maxLength={140}
                placeholder="A very short one line description of the event here.."
                onChange={(e) => {
                  handleChangeEventDetailsForm(e);
                }}
                required
              />
              {checkReqierdField && !handleFormInput?.Short_description && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  Above field is required{" "}
                </p>
              )}
            </div>

            <div className="input-details">
              <label>Detail description of the event</label>
              <textarea
                ref={(ref) => registerRef(ref, 2)}
                onKeyDown={(event) => handleKeyDown(event, 2)}
                maxLength={500}
                name="longDescription"
                value={handleFormInput?.longDescription}
                placeholder="Type here"
                required
                onChange={(e) => {
                  handleChangeEventDetailsForm(e);
                }}
              />
              {checkReqierdField && !handleFormInput?.longDescription && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  Above field is required{" "}
                </p>
              )}
            </div>

            <div className="input-details">
              <label>Event website URL</label>
              <input
                ref={(ref) => registerRef(ref, 3)}
                onKeyDown={(event) => handleKeyDown(event, 3)}
                placeholder="eg. https://www.google.com"
                name="eventWebsiteUrl"
                type="text"
                value={handleFormInput?.eventWebsiteUrl}
                onChange={(e) => {
                  handleChangeEventDetailsForm(e);
                }}
              />
              {/* {checkReqierdField && !handleFormInput?.eventWebsiteUrl && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>} */}
              {!isValid && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  Invalid website link
                </p>
              )}
            </div>
            <div className="input-details">
              <label>Email Id</label>
              <input
                ref={(ref) => registerRef(ref, 20)}
                onKeyDown={(event) => handleKeyDown(event, 20)}
                placeholder="eg. abc@mail.com"
                name="contactEmailId"
                type="text"
                value={handleFormInput?.contactEmailId}
                onChange={(e) => {
                  handleChangeEventDetailsForm(e);
                }}
              />
              {!isValid2 && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  Invalid Email Id
                </p>
              )}
            </div>
            <div className="event_details_inputbox_checkbox">
              <input
                ref={(ref) => registerRef(ref, 4)}
                onKeyDown={(event) => handleKeyDown(event, 4)}
                type="checkbox"
                name="exclusive"
                checked={handleFormInput?.exclusive}
                onChange={(e) => {
                  handleChangeEventDetailsForm(e);
                }}
              ></input>
              <p>Exclusive</p>
            </div>

            <div className="double">
              <div className="input-details">
                <label>Mode</label>
                <select
                  ref={(ref) => registerRef(ref, 5)}
                  onKeyDown={(event) => handleKeyDown(event, 5)}
                  name="mode"
                  value={handleFormInput?.mode}
                  required
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                >
                  <option>Select</option>
                  <option>Hybrid Event</option>
                  <option>In Person</option>
                  <option>Online Event</option>
                </select>
                {checkReqierdField && !handleFormInput?.mode && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>

              <div className="input-details">
                <label>Engagement Team</label>
                <select
                  ref={(ref) => registerRef(ref, 6)}
                  onKeyDown={(event) => handleKeyDown(event, 6)}
                  value={handleFormInput?.engagementType}
                  name="engagementType"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                >
                  <option>Select</option>
                  <option>Open For Discussion</option>
                  <option>Pro Bono</option>
                  <option>Paid</option>
                </select>
                {checkReqierdField && !handleFormInput?.engagementType && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label>Event Type</label>
                <select
                  ref={(ref) => registerRef(ref, 7)}
                  onKeyDown={(event) => handleKeyDown(event, 7)}
                  value={handleFormInput?.eventType}
                  name="eventType"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                >
                  <option> Select</option>
                  <option> Conference</option>
                  <option> Employee Engagement Program</option>
                  <option> Internal L&D Event</option>
                  <option> Online Video or Audio Interviews</option>
                  <option> Summit</option>
                  <option> Others</option>
                </select>
                {checkReqierdField && !handleFormInput?.eventType && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>

              <div className="input-details">
                <label> Audience Type</label>
                <select
                  ref={(ref) => registerRef(ref, 8)}
                  onKeyDown={(event) => handleKeyDown(event, 8)}
                  value={handleFormInput?.audienceType}
                  name="audienceType"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                >
                  <option>Select</option>
                  <option>Corporate Employees</option>
                  <option>Entrepreneurs</option>
                  <option>Founders</option>
                  <option>HR</option>
                  <option>Professionals</option>
                  <option>Students</option>
                  <option>Scientists</option>
                  <option>Techies</option>
                  <option>Others</option>
                </select>
                {checkReqierdField && !handleFormInput?.audienceType && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label>Audience Size</label>
                <select
                  ref={(ref) => registerRef(ref, 9)}
                  onKeyDown={(event) => handleKeyDown(event, 9)}
                  value={handleFormInput?.audienceSize}
                  name="audienceSize"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
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
                {checkReqierdField && !handleFormInput?.audienceSize && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>

              <div className="input-details">
                <label>Category</label>
                <select
                  ref={(ref) => registerRef(ref, 10)}
                  onKeyDown={(event) => handleKeyDown(event, 10)}
                  value={handleFormInput?.category}
                  name="category"
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                >
                  <option value="">Select</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Automobile">Automobile</option>
                  <option value="Business">Business </option>
                  <option value="Banking">Banking </option>
                  <option value="Coaching">Coaching</option>
                  <option value="Communication">Communication</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="Design Thinking">Design Thinking</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="E commerce">E commerce</option>
                  <option value="Finance">Finance</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Health">Health</option>
                  <option value="Human resource">Human resource </option>
                  <option value="Information Technology">
                    Information Technology{" "}
                  </option>
                  <option value="Innovation">Innovation </option>
                  <option value="Leadership">Leadership</option>
                  <option value="LGBTQ">LGBTQ</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Medical">Medical</option>
                  <option value="Musician"> Musician</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Oil Gas">Oil Gas</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Presentation Skill">Presentation Skill</option>
                  <option value="Retails">Retails</option>
                  <option value="Sales"> Sales</option>
                  <option value="Soft Skill">Soft Skill</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Tedx Food">Tedx Food</option>
                </select>
                {checkReqierdField && !handleFormInput?.category && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label for="start">Start Date:</label>
                <input
                  ref={(ref) => registerRef(ref, 11)}
                  onKeyDown={(event) => handleKeyDown(event, 11)}
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                  type="date"
                  id="start"
                  name="startdate"
                  value={handleFormInput?.startdate}
                  max={handleFormInput.enddate}
                ></input>
                {checkReqierdField && !handleFormInput?.startdate && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
              <div className="input-details">
                <label for="appt">Start Time:</label>
                <input
                  ref={(ref) => registerRef(ref, 12)}
                  onKeyDown={(event) => handleKeyDown(event, 12)}
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                  type="time"
                  id="appt"
                  name="starttime"
                  value={handleFormInput?.starttime}
                  min={handleFormInput?.endtime}
                  required
                />
                {checkReqierdField && !handleFormInput?.starttime && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="double">
              <div className="input-details">
                <label for="start">End Date:</label>
                <input
                  ref={(ref) => registerRef(ref, 13)}
                  onKeyDown={(event) => handleKeyDown(event, 13)}
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                  type="date"
                  id="start"
                  name="enddate"
                  min={handleFormInput?.startdate}
                  value={handleFormInput?.enddate}
                ></input>
                {checkReqierdField && !handleFormInput?.enddate && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
              <div className="input-details">
                <label for="appt">End Time:</label>
                <input
                  ref={(ref) => registerRef(ref, 14)}
                  onKeyDown={(event) => handleKeyDown(event, 14)}
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                  type="time"
                  id="appt"
                  name="endtime"
                  value={handleFormInput?.endtime}
                  max={handleFormInput?.starttime}
                  required
                />
                {checkReqierdField && !handleFormInput?.endtime && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="input-details">
              <label>Location</label>
              <input
                ref={(ref) => registerRef(ref, 15)}
                onKeyDown={(event) => handleKeyDown(event, 15)}
                name="location"
                type="text"
                placeholder="Type here"
                value={handleFormInput?.location}
                required
                onChange={(e) => {
                  handleChangeEventDetailsForm(e);
                }}
              />
              {checkReqierdField && !handleFormInput?.location && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  Above field is required{" "}
                </p>
              )}
            </div>

            <div className="double">
              <div className="input-details">
                <label>City</label>
                <input
                  ref={(ref) => registerRef(ref, 16)}
                  onKeyDown={(event) => handleKeyDown(event, 16)}
                  name="city"
                  type="text"
                  placeholder="Type here"
                  required
                  value={handleFormInput?.city}
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                />
                {checkReqierdField && !handleFormInput?.city && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>

              <div className="input-details">
                <label>Pin Code</label>
                <input
                  ref={(ref) => registerRef(ref, 17)}
                  onKeyDown={(event) => handleKeyDown(event, 17)}
                  name="pincode"
                  type="number"
                  placeholder="Type here"
                  required
                  value={handleFormInput?.pincode}
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                />
                {checkReqierdField && !handleFormInput?.pincode && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>

              <div className="input-details">
                <label>Country</label>
                <input
                  ref={(ref) => registerRef(ref, 18)}
                  onKeyDown={(event) => handleKeyDown(event, 18)}
                  name="country"
                  type="text"
                  placeholder="Type here"
                  required
                  value={handleFormInput?.country}
                  onChange={(e) => {
                    handleChangeEventDetailsForm(e);
                  }}
                />
                {checkReqierdField && !handleFormInput?.country && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Above field is required{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="card_3next_button">
              <button
                ref={(ref) => registerRef(ref, 19)}
                onKeyDown={(event) => handleKeyDown(event, 19)}
                type="submit"
                onClick={(e) => {
                  onSubmit(e);
                  setLoading(!loading);
                }}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Eventdetails;
