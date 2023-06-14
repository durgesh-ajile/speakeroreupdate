import React, { useEffect, useState } from "react";
import "./listyourevent.css";
import tech from "../../images/tech-support 1.png";
import Eventdetails from "../../utilities/Eventdetails/Eventdetails";
import Organizerdetails from "../../utilities/organizerdeatails/Organizerdetails";
import Preview from "../../utilities/Preview/Preview";
import { Event } from "@mui/icons-material";
import pinkback from "../../images/Vector 9.png";
import orangeback from "../../images/Vector 10.png";

const ListYourEvent = () => {
  const [handleFormInputListYourEvent, setHandleFormInputListYourEvent] = useState([]);
  const [organiseInableDisable, setOrganiseInableDisable] = useState(true);
  const [handleOrganizerDetails, setHandleOrganizerDetails] = useState([])
  const [stateHandle_Event_Organiser_Preview, setStateHandle_Event_Organiser_Preview] = useState({ "event": true, "organise": false, "preview": false });
  const [tags, setTags] = useState([]);

  const eventDetails = (handleFormInput) => { setHandleFormInputListYourEvent(handleFormInput) };

  const organizerDetails = (handleOrganizerDetails, tags) => {
    setHandleOrganizerDetails(() => handleOrganizerDetails)
    setTags(() => tags)
  };

  const stateData = { ...handleFormInputListYourEvent, ...handleOrganizerDetails, tags };

  const handle_Event_Organiser_Preview = (type) => {
    if (type === 'event') {
      setStateHandle_Event_Organiser_Preview(p => {
        p.event = true
        p.organise = false
        p.preview = false
        return { ...p }
      })
    } else if (type === 'organise') {
      setStateHandle_Event_Organiser_Preview(p => {
        p.event = false
        p.organise = true
        p.preview = false
        return { ...p }
      })
    } else if (type === 'preview') {
      setStateHandle_Event_Organiser_Preview(p => {
        p.event = false
        p.organise = false
        p.preview = true
        return { ...p }
      })
    }
  }

  useEffect(() => {
    if (handleFormInputListYourEvent?.country &&
      handleFormInputListYourEvent?.pincode &&
      handleFormInputListYourEvent?.city &&
      handleFormInputListYourEvent?.location &&
      handleFormInputListYourEvent?.eventWebsiteUrl &&
      handleFormInputListYourEvent?.longDescription &&
      handleFormInputListYourEvent?.Short_description &&
      handleFormInputListYourEvent?.event &&
      handleFormInputListYourEvent?.mode &&
      handleFormInputListYourEvent?.engagementType &&
      handleFormInputListYourEvent?.eventType &&
      handleFormInputListYourEvent?.audienceType &&
      handleFormInputListYourEvent?.audienceSize &&
      handleFormInputListYourEvent?.category) {
      setOrganiseInableDisable(false)

    }
  }, [handleFormInputListYourEvent])


  return (
    <div>
      <div className="event-logo">
        <div className="list-img">
          <img id="orange-list" src={orangeback} />
          <img id="pink-list" src={pinkback} />
          <img id="man-img" src={tech} />
        </div>
        <h2>List your Event</h2>
        <div className="list-event">
          <span>
            Get the best Industry experts on your stage for your audience
            without any middlemen. Any <br />
            niche, any location, any occasion. Interviews, Keynotes, Emcees,
            Trainers, Workshops,
            <br /> Webinars, Seminars, Collaborations or more. We have got you
            covered.
          </span>
        </div>
      </div>
      <div className="listbutton event-button">
        <button onClick={() => handle_Event_Organiser_Preview("event")}
        
          style={{ backgroundColor: stateHandle_Event_Organiser_Preview?.event === false ? 'rgba(180, 208, 195, 1)' : '' , cursor: organiseInableDisable ? "no-drop" : "no-drop" }}
          disabled={true} id={stateHandle_Event_Organiser_Preview?.event === true ? "green" : ""}>
          1. Event details
        </button>
        <button onClick={() => handle_Event_Organiser_Preview("organise")}
          disabled={true }
          id={stateHandle_Event_Organiser_Preview?.organise === true ? "green" : ""} style={{ backgroundColor: stateHandle_Event_Organiser_Preview?.preview === !false ? 'rgba(180, 208, 195, 1)' : '' , cursor: organiseInableDisable ? "no-drop" : "no-drop" }}>
          2. Organizer details
        </button>
        <button onClick={() => handle_Event_Organiser_Preview("preview")} disabled={true} id={stateHandle_Event_Organiser_Preview?.preview === true ? "green" : ""} style={{ cursor: organiseInableDisable ? "no-drop" : "no-drop" }}>
          3. Preview
        </button>
      </div>

      {stateHandle_Event_Organiser_Preview?.event === true ? (
        <Eventdetails
          eventDetails={eventDetails}
          setStateHandle_Event_Organiser_Preview={setStateHandle_Event_Organiser_Preview}
          stateHandle_Event_Organiser_Preview={stateHandle_Event_Organiser_Preview}
        />
      ) : stateHandle_Event_Organiser_Preview?.organise === true ? (
        <Organizerdetails
          organizerDetails={organizerDetails}
          setStateHandle_Event_Organiser_Preview={setStateHandle_Event_Organiser_Preview}
          stateHandle_Event_Organiser_Preview={stateHandle_Event_Organiser_Preview}
        />
      ) : (
        <Preview stateData={stateData}
          setStateHandle_Event_Organiser_Preview={setStateHandle_Event_Organiser_Preview}
          stateHandle_Event_Organiser_Preview={stateHandle_Event_Organiser_Preview}
        />
      )}
    </div>
  );
};

export default ListYourEvent;