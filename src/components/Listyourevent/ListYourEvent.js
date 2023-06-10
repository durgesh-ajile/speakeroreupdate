import React, { useState } from "react";
import "./listyourevent.css";
import tech from "../../images/tech-support 1.png";
import Eventdetails from "../../utilities/Eventdetails/Eventdetails";
import Organizerdetails from "../../utilities/organizerdeatails/Organizerdetails";
import Preview from "../../utilities/Preview/Preview";
import { Event } from "@mui/icons-material";
import pinkback from "../../images/Vector 9.png";
import orangeback from "../../images/Vector 10.png";

const ListYourEvent = () => {
  const [event, setEvent] = useState(true);
  const [organise, setOrganise] = useState(false);
  const [preview, setPreview] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [eventWebsiteUrl, setEventWebsiteUrl] = useState("");
  const [mode, setMode] = useState("");
  const [engagementType, setEngagementType] = useState("");
  const [eventType, setEventType] = useState("");
  const [audienceType, setAudienceType] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerContactNumber, setOrganizerContactNumber] = useState("");
  const [tags, setTags] = useState([]);

  const eventDetails = (
    eventTitle,
    shortDescription,
    longDescription,
    eventWebsiteUrl,
    mode,
    engagementType,
    eventType,
    audienceType,
    audienceSize,
    category,
    location,
    city,
    pincode,
    country
  ) => {
    setEventTitle(eventTitle);
    setShortDescription(shortDescription);
    setLongDescription(longDescription);
    setEventWebsiteUrl(eventWebsiteUrl);
    setMode(mode);
    setEngagementType(engagementType);
    setEventType(eventType);
    setAudienceType(audienceType);
    setAudienceSize(audienceSize);
    setCategory(category);
    setLocation(location);
    setCity(city);
    setPincode(pincode);
    setCountry(country);
  };

  const organizerDetails = (
    organizerName,
    organizerEmail,
    organizerContactNumber,
    tags
  ) => {
    setOrganizerName(organizerName);
    setOrganizerEmail(organizerEmail);
    setOrganizerContactNumber(organizerContactNumber);
    setTags(tags);
  };

  const stateData = {
    eventTitle,
    shortDescription,
    longDescription,
    eventWebsiteUrl,
    mode,
    engagementType,
    eventType,
    audienceType,
    audienceSize,
    category,
    location,
    city,
    pincode,
    country,
    organizerName,
    organizerEmail,
    organizerContactNumber,
    tags,
  };

  // className={left == true ? "green" : ""}
  const handleEvent = () => {
    setEvent(true);
    setOrganise(false);
    setPreview(false);
  };
  const handleOrganiser = () => {
    setEvent(false);
    setOrganise(true);
    setPreview(false);
  };
  const handlePreview = () => {
    setEvent(false);
    setOrganise(false);
    setPreview(true);
  };

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
        <button onClick={handleEvent} id={event == true ? "green" : ""}>
          1. Event details
        </button>
        <button onClick={handleOrganiser} id={organise == true ? "green" : ""}>
          2. Organizer details
        </button>
        <button onClick={handlePreview} id={preview == true ? "green" : ""}>
          3. Preview
        </button>
      </div>
      {/* ............. */}

      {/* <Eventdetails/> */}

      {/* <Organizerdetails/> */}

      {event == true ? (
        <Eventdetails
          eventDetails={eventDetails}
          event={event}
          setEvent={setEvent}
          setOrganise={setOrganise}
        />
      ) : organise == true ? (
        <Organizerdetails
          organizerDetails={organizerDetails}
          organise={organise}
          setOrganise={setOrganise}
          setPreview={setPreview}
        />
      ) : (
        <Preview stateData={stateData} />
      )}
    </div>
  );
};

export default ListYourEvent;
