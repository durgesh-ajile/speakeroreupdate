import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Organizerdetails = ({
  organizerDetails,
  organise,
  setOrganise,
  setPreview,
}) => {
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerContactNumber, setOrganizerContactNumber] = useState("");
  const [tags, setTags] = useState([]);

  const handleClick = () => {
    setOrganise(false);
    setPreview(true);
  };

  organizerDetails(organizerName, organizerEmail, organizerContactNumber, tags);
  return (
    <div>
      <form>
        <div className="input-details">
          <label>Organizer Name</label>
          <input
            type="text"
            placeholder="Enter the Organizer Name"
            onChange={(e) => {
              setOrganizerName(e.target.value);
            }}
          />
        </div>

        <div className="double">
          <div className="input-details">
            <label>Organizer Email</label>
            <input
              type="text"
              required
              onChange={(e) => {
                setOrganizerEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-details">
            <label>Organizer Contact Number</label>
            <input
              type="number"
              required
              onChange={(e) => {
                setOrganizerContactNumber(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="input-details">
          <label>Tags</label>
          <span>
            Improve discoverability of your event by adding relevent to subject
            matter.
          </span>
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tag"
            placeHolder="Enter keyword"
          />
        </div>

        {organise == true ? (
          <div className="card-3 next-button">
            <button onClick={handleClick}>Next</button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Organizerdetails;
