import { AddAlert } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Organizerdetails = ({ organizerDetails, setStateHandle_Event_Organiser_Preview }) => {

  const [handleOrganizerDetails, setHandleOrganizerDetails] = useState([])
  const [checkReqierdField, setcheckReqierdField] = useState(false)
  const [tags, setTags] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setcheckReqierdField(true)
    if (handleOrganizerDetails?.organizerName &&
      handleOrganizerDetails?.organizerEmail &&
      handleOrganizerDetails?.organizerContactNumber 
      // &&  tags.length > 0
      ) {
      setStateHandle_Event_Organiser_Preview(p => {
        p.organise = false
        p.preview = true
        return { ...p }
      })
    }
  };

  organizerDetails(handleOrganizerDetails, tags);

  const handleChangeOrganizerDetailsForm = (e) => {
    let tempprev = {}
    if (e.target.name === 'organizerContactNumber') {
      setHandleOrganizerDetails(prev => {
        let numberString
        if (typeof prev.organizerContactNumber === 'string') {
          numberString = prev.organizerContactNumber.length
        }
        prev[e.target.name] = e.target.value
        tempprev = prev
        if (numberString >= 10) {
          prev.organizerContactNumber = prev.organizerContactNumber.slice(0, 10)
        }
        return { ...prev }
      });
    } else {
      setHandleOrganizerDetails(prev => {
        prev[e.target.name] = e.target.value
        tempprev = prev
        return { ...prev }
      })
    }
    localStorage.setItem('handleOrganizerDetails', JSON.stringify(tempprev))
  }

  const previous_Button = () => {
    setStateHandle_Event_Organiser_Preview(p => { p.event = !false; p.organise = !true; return { ...p } });
  }

  // useEffect(() => {
  //   const handleOrganizerDetailsLocal = JSON.parse(localStorage.getItem('handleOrganizerDetails'))
  //   setHandleOrganizerDetails(() => handleOrganizerDetailsLocal)
  // }, [])

  return (
    <div>
      <form>
        <div className="input-details">
          <label>Organizer Name</label>
          <input
            name="organizerName"
            type="text"
            value={handleOrganizerDetails?.organizerName}

            placeholder="Enter the Organizer Name"
            onChange={(e) => { handleChangeOrganizerDetailsForm(e) }}
          />
          {
            checkReqierdField &&
            !handleOrganizerDetails?.organizerName && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
          }
        </div>

        <div className="double">
          <div className="input-details">
            <label>Organizer Email</label>
            <input
              name="organizerEmail"
              type="email"
              required
              value={handleOrganizerDetails?.organizerEmail}
              onChange={(e) => { handleChangeOrganizerDetailsForm(e) }}
            />
            {
              checkReqierdField &&
              !handleOrganizerDetails?.organizerEmail && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
            }
          </div>

          <div className="input-details">
            <label>Organizer Contact Number</label>
            <input
              type="number"
              name="organizerContactNumber"
              // maxLength={13}
              // min={10}
              disabled={!true}
              // max={10}
              required
              maxLength={10}
              value={handleOrganizerDetails?.organizerContactNumber}
              onChange={(e) => { handleChangeOrganizerDetailsForm(e) }}
            />
            {
              checkReqierdField &&
              !handleOrganizerDetails?.organizerContactNumber && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
            }
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
            placeHolder="Press Enter To Add a Field"
          />
          {
            checkReqierdField &&
            tags.length < 1 && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
          }
        </div>

        <div className="card-3 next-button">
          <button type="button" onClick={(e) => previous_Button(e)} style={{ marginRight: '10px' }}>Previous</button>
          <button type="submit" onClick={(e) => onSubmit(e)} >Next</button>
        </div>
      </form>
    </div>
  );
};

export default Organizerdetails;
