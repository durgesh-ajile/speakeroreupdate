import React, { useState } from "react";
import "./Eventdetails.css";

const Eventdetails = ({ eventDetails, event, setEvent, setOrganise }) => {
  const [left, setLeft] = useState(true);
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

  eventDetails(
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
  );
  const handleClick = () => {
    setEvent(false);
    setOrganise(true);
  };

  return (
    <div className="listevent-container">
      <div>
        <div>
          <form className="event-form">
            <div className="input-details">
              <label>Title of Event</label>
              <input
                type="text"
                placeholder="Enter the title of event"
                onChange={(e) => {
                  setEventTitle(e.target.value);
                }}
                required
              />
            </div>

            <div className="input-details">
              <label>Short description Of the event</label>
              <textarea
                placeholder="A very short one line description of the event here.."
                onChange={(e) => {
                  setShortDescription(e.target.value);
                }}
                required
              />
            </div>

            <div className="input-details">
              <label>Detail description of the event</label>
              <textarea
                placeholder="Type here"
                required
                onChange={(e) => {
                  setLongDescription(e.target.value);
                }}
              />
            </div>

            <div className="input-details">
              <label>Event website URL</label>
              <input
                type="text"
                required
                onChange={(e) => {
                  setEventWebsiteUrl(e.target.value);
                }}
              />
            </div>

            <div className="double">
              <div className="input-details">
                <label>Mode</label>
                <select
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                >
                  <option>Online Event</option>
                  <option>Offline Event</option>
                </select>
              </div>

              <div className="input-details">
                <label>Engagement Team</label>
                <select
                  onChange={(e) => {
                    setEngagementType(e.target.value);
                  }}
                >
                  <option>Online Event</option>
                  <option>Offline Event</option>
                </select>
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label>Event Type</label>
                <select
                  onChange={(e) => {
                    setEventType(e.target.value);
                  }}
                >
                  <option>Employee engagement</option>
                  <option> Event</option>
                </select>
              </div>

              <div className="input-details">
                <label> Audience Type</label>
                <select
                  onChange={(e) => {
                    setAudienceType(e.target.value);
                  }}
                >
                  <option> Student</option>
                  <option> Business Man</option>
                </select>
              </div>
            </div>

            <div className="double">
              <div className="input-details">
                <label>Audience Size</label>
                <select
                  onChange={(e) => {
                    setAudienceSize(e.target.value);
                  }}
                >
                  <option> 100</option>
                  <option> 200</option>
                  <option> 400</option>
                  <option> 500</option>
                  <option> 700</option>
                  <option> 1000</option>
                </select>
              </div>

              <div className="input-details">
                <label>Cateogary</label>
                <select
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option>Business </option>
                  <option> Musician</option>
                </select>
              </div>
            </div>

            <div className="input-details">
              <label>Location</label>
              <input
                type="text"
                placeholder="Type here"
                required
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </div>

            <div className="double">
              <div className="input-details">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Type here"
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>

              <div className="input-details">
                <label>Pin Code</label>
                <input
                  type="text"
                  placeholder="Type here"
                  required
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                />
              </div>

              <div className="input-details">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Type here"
                  required
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>
            </div>

            {event == true ? (
              <div className="card-3 next-button">
                <button type="submit" onClick={handleClick}>
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Eventdetails;
