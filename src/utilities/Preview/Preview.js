import React, { useState } from "react";
// import Eventdetails from "../Eventdetails/Eventdetails";
// import Organizerdetails from "../organizerdeatails/Organizerdetails";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const successToast = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
const Preview = ({ stateData, setStateHandle_Event_Organiser_Preview }) => {

  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = useNavigate();

  const { Short_description, audienceSize, audienceType, category, city, country,
    engagementType, event, eventType, eventWebsiteUrl, location, longDescription,
    mode, pincode, organizerName, organizerEmail, organizerContactNumber, tags,
    startdate, enddate, endtime, starttime, exclusive } = stateData;


  const previous_Button = () => {
    setStateHandle_Event_Organiser_Preview(p => { p.event = false; p.organise = true; p.preview = false; return { ...p } })
  }

  console.log(starttime, endtime)
  const handleCreateEvent = (e) => {
    e.preventDefault();
    setIsDisabled(() => true)
    axios({
      method: "post",
      url: "https://api.speakerore.com/api/createEvent",
      data: {
        titleOfTheEvent: event,
        shortDescriptionOfTheEvent: Short_description,
        detailedDescriptionOfTheEvent: longDescription,
        eventWebsiteUrl: eventWebsiteUrl,
        mode: mode,
        engageMentTerm: engagementType,
        eventType: eventType,
        audienceType: audienceType,
        audienceSize: audienceSize,
        category: category,
        eventStartDate: startdate,
        eventEndDate: enddate,
        eventStartTime: starttime,
        eventEndTime: endtime,
        location: location,
        city: city,
        pincode: pincode,
        country: country,
        organizerName: organizerName,
        organizerEmail: organizerEmail,
        organizerContactNumber: organizerContactNumber,
        tags: tags,
        isSpeakeroreExclusive: exclusive,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("handleFormInput");
        localStorage.removeItem("handleOrganizerDetails");
        toast.success(res.data.message, successToast);
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
        setIsDisabled(() => false)
      })
      .catch((err) => {
        console.log(err);
        setIsDisabled(() => false)
        if(err.response.data.message){
          toast.error(err.response.data.message, successToast);
        } else {
          console.log(err)
        }
      });
  };

  const style = {

    float: 'right',
    height: '40px',
    width: '130px',
    border: 'none',
    color: 'white',
    background: '#24754F',
    // cursor: 'pointer',
    margin: '20px 0px 20px 0px',
    borderRadius: '7px',
    fontWeight: '600',
    cursor: isDisabled ? "no-drop" : "pointer",
    // float: 'right',
    marginRight: '10px',
    marginTop: '30px'

  }

  return (
    <div>
    <ToastContainer/>
      <div className="listevent-container">
        <div>
          <div>
            <form className="event-form">
              <div className="input-details">
                <label>Title of Event</label>
                <input
                  type="text"
                  // placeholder="Enter the title of event"
                  defaultValue={event}
                  readOnly
                  disabled
                />
              </div>

              <div className="input-details">
                <label>Short description Of the event</label>
                <textarea
                  // placeholder="A very short one line description of the event here.."
                  required
                  defaultValue={Short_description}
                  readOnly
                  disabled

                />
              </div>

              <div className="input-details">
                <label>Detail description of the event</label>
                <textarea
                  // placeholder="Type here"
                  required
                  defaultValue={longDescription}
                  disabled

                />
              </div>

              <div className="input-details">
                <label>Event website URL</label>
                <input type="text" required
                  defaultValue={eventWebsiteUrl}
                  disabled />
              </div>
              <div className="event_details_inputbox_checkbox" >
                <input type="checkbox"
                  name="exclusive"
                  disabled
                  checked={exclusive}
                >
                </input>
                <p>Exclusive</p>
              </div>


              <div className="double">
                <div className="input-details">
                  <label>Mode</label>
                  <input type="text" required
                    defaultValue={mode}
                    disabled />
                </div>

                <div className="input-details">
                  <label>Engagement Team</label>
                  <input type="text" required
                    defaultValue={engagementType}
                    disabled />
                </div>
              </div>

              <div className="double">
                <div className="input-details">
                  <label>Event Type</label>
                  <input type="text" required
                    defaultValue={eventType}
                    disabled />
                </div>

                <div className="input-details">
                  <label> Audience Type</label>
                  <input type="text" required
                    defaultValue={audienceType}
                    disabled />
                </div>
              </div>

              <div className="double">
                <div className="input-details">
                  <label>Audience Size</label>
                  <input type="text" required
                    defaultValue={audienceSize}
                    disabled />
                </div>

                <div className="input-details">
                  <label>Category</label>
                  <input type="text" required
                    defaultValue={category}
                    disabled />
                </div>
              </div>

              <div className="double">
                <div className="input-details">
                  <label for="start">Start Date:</label>
                  <input type="date" id="start" name="trip-start"

                    required
                    defaultValue={startdate}
                    disabled
                  >
                  </input>
                </div>
                <div className="input-details">
                  <label for="appt">Start Time:</label>
                  <input type="time" id="appt" name="appt"

                    required
                    defaultValue={starttime}
                    disabled
                  />
                </div>
              </div>
              <div className="double">
                <div className="input-details">
                  <label for="start">End Date:</label>
                  <input type="date" id="start" name="trip-start"

                    required
                    defaultValue={enddate}
                    disabled
                  >
                  </input>
                </div>
                <div className="input-details">
                  <label for="appt">End Time:</label>
                  <input type="time" id="appt" name="appt"

                    required
                    defaultValue={endtime}
                    disabled
                  />
                </div>
              </div>

              <div className="input-details">
                <label>Location</label>
                <input
                  type="text"
                  // placeholder="Type here"
                  required
                  defaultValue={location}
                  disabled
                />
              </div>

              <div className="double">
                <div className="input-details">
                  <label>City</label>
                  <input
                    type="text"
                    // placeholder="Type here"
                    required
                    defaultValue={city}
                    disabled
                  />
                </div>

                <div className="input-details">
                  <label>Pin Code</label>
                  <input
                    type="text"
                    // placeholder="Type here"
                    required
                    defaultValue={pincode}
                    disabled
                  />
                </div>

                <div className="input-details">
                  <label>Country</label>
                  <input
                    type="text"
                    // placeholder="Type here"
                    required
                    defaultValue={country}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="Organizer_Details" >
        <h1>Organizer Details</h1>
      </div>
      <div>
        <form>
          <div className="input-details">
            <label>Organizer Name</label>
            <input
              type="text"
              // placeholder="Enter the Organizer Name"
              defaultValue={organizerName}
              disabled
            />
          </div>

          <div className="double">
            <div className="input-details">
              <label>Organizer Email</label>
              <input type="text" required
                defaultValue={organizerEmail}
                disabled />
            </div>

            <div className="input-details">
              <label>Organizer Contact Number</label>
              <input
                type="number"
                required
                defaultValue={organizerContactNumber}
                disabled
              />
            </div>
          </div>

          <div className="input-details">
            <label>Tags</label>
            <span>
              Improve discoverability of your event by adding relevent to
              subject matter.
            </span>
            <TagsInput
              value={tags}
              // onChange={setTags}
              defaultValue={tags}
              name="tag"
              // placeHolder="Enter keyword"
              disabled
            />
          </div>
        </form>
      </div>

      <div className="card_3next_buttons">
        <button onClick={handleCreateEvent} disabled={isDisabled} style={style}> {isDisabled ? 'Loading...' : 'Submit'} </button>
        <button type="click" onClick={(e) => previous_Button(e)} style={style}>Previous</button>
      </div>

    </div>
  );
};

export default Preview;
