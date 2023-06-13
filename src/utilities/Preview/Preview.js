import React, { useEffect } from "react";
import Eventdetails from "../Eventdetails/Eventdetails";
import Organizerdetails from "../organizerdeatails/Organizerdetails";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";

const Preview = ({ stateData }) => {
  const {
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
  } = stateData;

  const handleCreateEvent = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://sobacke.in/api/createEvent",
      data: {
      titleOfTheEvent: eventTitle,
      shortDescriptionOfTheEvent: shortDescription,
      detailedDescriptionOfTheEvent: longDescription,
      eventWebsiteUrl: eventWebsiteUrl,
      mode: mode,
      engageMentTerm: engagementType,
      eventType: eventType,
      audienceType: audienceType,
      audienceSize: audienceSize,
      category: category,
      eventStartDate: "2023-06-20T00:00:00",
      eventEndDate: "2023-06-25T00:00:00",
      eventStartTime: "13:00",
      eventEndTime: "17:00",
      location: location,
      city: city,
      pincode: pincode,
      country: country,
      organizerName: organizerName,
      organizerEmail: organizerEmail,
      organizerContactNumber: organizerContactNumber,
      tags: tags,
      isSpeakeroreExclusive: true,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="listevent-container">
        <div>
          <div>
            <form className="event-form">
              <div className="input-details">
                <label>Title of Event</label>
                <input
                  type="text"
                  placeholder="Enter the title of event"
                  defaultValue={eventTitle}
                  readOnly
                />
              </div>

              <div className="input-details">
                <label>Short description Of the event</label>
                <textarea
                  placeholder="A very short one line description of the event here.."
                  required
                  defaultValue={shortDescription}
                  readOnly
                />
              </div>

              <div className="input-details">
                <label>Detail description of the event</label>
                <textarea
                  placeholder="Type here"
                  required
                  defaultValue={longDescription}
                />
              </div>

              <div className="input-details">
                <label>Event website URL</label>
                <input type="text" required defaultValue={eventWebsiteUrl} />
              </div>

              <div className="double">
                <div className="input-details">
                  <label>Mode</label>
                  <input type="text" required defaultValue={mode} />
                </div>

                <div className="input-details">
                  <label>Engagement Team</label>
                  <input type="text" required defaultValue={engagementType} />
                </div>
              </div>

              <div className="double">
                <div className="input-details">
                  <label>Event Type</label>
                  <input type="text" required defaultValue={eventType} />
                </div>

                <div className="input-details">
                  <label> Audience Type</label>
                  <input type="text" required defaultValue={audienceType} />
                </div>
              </div>

              <div className="double">
                <div className="input-details">
                  <label>Audience Size</label>
                  <input type="text" required defaultValue={audienceSize} />
                </div>

                <div className="input-details">
                  <label>Cateogary</label>
                  <input type="text" required defaultValue={category} />
                </div>
              </div>

              <div className="input-details">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Type here"
                  required
                  defaultValue={location}
                />
              </div>

              <div className="double">
                <div className="input-details">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    required
                    defaultValue={city}
                  />
                </div>

                <div className="input-details">
                  <label>Pin Code</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    required
                    defaultValue={pincode}
                  />
                </div>

                <div className="input-details">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    required
                    defaultValue={country}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "16.5%", color: "#4D4B4B" }}>
        <h1>Organizer Details</h1>
      </div>
      <div>
        <form>
          <div className="input-details">
            <label>Organizer Name</label>
            <input
              type="text"
              placeholder="Enter the Organizer Name"
              defaultValue={organizerName}
            />
          </div>

          <div className="double">
            <div className="input-details">
              <label>Organizer Email</label>
              <input type="text" required defaultValue={organizerEmail} />
            </div>

            <div className="input-details">
              <label>Organizer Contact Number</label>
              <input
                type="number"
                required
                defaultValue={organizerContactNumber}
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
              name="tag"
              placeHolder="Enter keyword"
            />
          </div>
        </form>
      </div>
      <div
        className="card-3 next-button"
        style={{ width: "85%", textAlign: "right" }}
      >
        <button onClick={handleCreateEvent}>Submit</button>
      </div>
    </div>
  );
};

export default Preview;
