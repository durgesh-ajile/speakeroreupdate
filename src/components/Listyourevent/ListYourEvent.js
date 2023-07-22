import React, { useEffect, useState } from "react";
import "./listyourevent.css";
import tech from "../../images/tech_support.png";
import Eventdetails from "../../utilities/Eventdetails/Eventdetails";
import Organizerdetails from "../../utilities/organizerdeatails/Organizerdetails";
import Preview from "../../utilities/Preview/Preview";
// import { Event } from "@mui/icons-material";
// import pinkback from "../../images/Vector 9.png";
// import orangeback from "../../images/Vector 10.png";

const ListYourEvent = () => {
  const [handleFormInputListYourEvent, setHandleFormInputListYourEvent] =
    useState([]);
  const [organiseInableDisable, setOrganiseInableDisable] = useState(true);
  const [handleOrganizerDetails, setHandleOrganizerDetails] = useState([]);
  const [
    stateHandle_Event_Organiser_Preview,
    setStateHandle_Event_Organiser_Preview,
  ] = useState({ event: true, organise: false, preview: false });
  const [tags, setTags] = useState([]);

  const eventDetails = (handleFormInput) => {
    setHandleFormInputListYourEvent(handleFormInput);
  };

  const organizerDetails = (handleOrganizerDetails, tags) => {
    setHandleOrganizerDetails(() => handleOrganizerDetails);
    setTags(() => tags);
  };

  const stateData = {
    ...handleFormInputListYourEvent,
    ...handleOrganizerDetails,
    tags,
  };

  const handle_Event_Organiser_Preview = (type) => {
    if (type === "event") {
      setStateHandle_Event_Organiser_Preview((p) => {
        p.event = true;
        p.organise = false;
        p.preview = false;
        return { ...p };
      });
    } else if (type === "organise") {
      setStateHandle_Event_Organiser_Preview((p) => {
        p.event = false;
        p.organise = true;
        p.preview = false;
        return { ...p };
      });
    } else if (type === "preview") {
      setStateHandle_Event_Organiser_Preview((p) => {
        p.event = false;
        p.organise = false;
        p.preview = true;
        return { ...p };
      });
    }
  };

  useEffect(() => {
    if (
      handleFormInputListYourEvent?.country &&
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
      handleFormInputListYourEvent?.category
    ) {
      setOrganiseInableDisable(false);
    }
  }, [handleFormInputListYourEvent]);

  return (
    <div className="ListYourEvent_container">
      <div className="ListYourEvent_container_fluid">
        <div className="ListYourEvent_container_fluid_image_heading_p">
          <div>
            <img id="man-img" src={tech} alt="ListYourEvent_container_tech" />
            <h2>List your Event</h2>
            <div>
              <p>
                Find the perfect speaker to elevate your conference, seminar,
                panel discussion, interview, podcast, keynote address, workshop,
                employee engagement program, or corporate event. Benefit from a
                diverse selection of speakers, communicate directly with top
                industry experts, thought leaders, and trainers to make your
                event an unforgettable success.
              </p>
            </div>
          </div>
        </div>
        <div className="List_Your_Event_Tab_Container">
          <div className="List_Your_Event_Tab_Container_Fluid">
            <div className={"green_border_bottom"}>
              <button
                onClick={() => handle_Event_Organiser_Preview("event")}
                style={{
                  backgroundColor:
                    stateHandle_Event_Organiser_Preview?.event === false
                      ? "rgba(180, 208, 195, 1)"
                      : "",
                  cursor: organiseInableDisable ? "no-drop" : "no-drop",
                }}
                disabled={true}
                id={
                  stateHandle_Event_Organiser_Preview?.event === true
                    ? "green"
                    : ""
                }
              >
                1. Event details
              </button>
            </div>
            <div
              className={
                (stateHandle_Event_Organiser_Preview?.organise === true ||
                  (stateHandle_Event_Organiser_Preview?.organise === false &&
                    stateHandle_Event_Organiser_Preview?.preview === true)) &&
                "green_border_bottom"
              }
            >
              <button
                onClick={() => handle_Event_Organiser_Preview("organise")}
                disabled={true}
                id={
                  stateHandle_Event_Organiser_Preview?.organise === true
                    ? "green"
                    : ""
                }
                style={{
                  backgroundColor:
                    stateHandle_Event_Organiser_Preview?.preview === !false
                      ? "rgba(180, 208, 195, 1)"
                      : "",
                  cursor: organiseInableDisable ? "no-drop" : "no-drop",
                }}
              >
                2. Organizer details
              </button>
            </div>
            <div
              className={
                stateHandle_Event_Organiser_Preview?.preview === true &&
                "green_border_bottom"
              }
            >
              <button
                onClick={() => handle_Event_Organiser_Preview("preview")}
                disabled={true}
                id={
                  stateHandle_Event_Organiser_Preview?.preview === true
                    ? "green"
                    : ""
                }
                style={{
                  cursor: organiseInableDisable ? "no-drop" : "no-drop",
                }}
              >
                3. Preview
              </button>
            </div>
          </div>
        </div>
        <div>
          {stateHandle_Event_Organiser_Preview?.event === true ? (
            <Eventdetails
              eventDetails={eventDetails}
              setStateHandle_Event_Organiser_Preview={
                setStateHandle_Event_Organiser_Preview
              }
              stateHandle_Event_Organiser_Preview={
                stateHandle_Event_Organiser_Preview
              }
            />
          ) : stateHandle_Event_Organiser_Preview?.organise === true ? (
            <Organizerdetails
              organizerDetails={organizerDetails}
              setStateHandle_Event_Organiser_Preview={
                setStateHandle_Event_Organiser_Preview
              }
              stateHandle_Event_Organiser_Preview={
                stateHandle_Event_Organiser_Preview
              }
            />
          ) : (
            <Preview
              stateData={stateData}
              setStateHandle_Event_Organiser_Preview={
                setStateHandle_Event_Organiser_Preview
              }
              stateHandle_Event_Organiser_Preview={
                stateHandle_Event_Organiser_Preview
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListYourEvent;
