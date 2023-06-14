import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Organizerdetails = ({ organizerDetails, stateHandle_Event_Organiser_Preview, setStateHandle_Event_Organiser_Preview }) => {

  const [handleOrganizerDetails, setHandleOrganizerDetails] = useState([])
  const [checkReqierdField, setcheckReqierdField] = useState(false)
  const [tags, setTags] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setcheckReqierdField(true)

    if (handleOrganizerDetails?.organizerName &&
      handleOrganizerDetails?.organizerEmail &&
      handleOrganizerDetails?.organizerContactNumber &&
      tags.length > 0) {
      setStateHandle_Event_Organiser_Preview(p => {
        p.organise = false
        p.preview = true
        return { ...p }
      })
    }

  };
  organizerDetails(handleOrganizerDetails, tags);

  const handleChangeOrganizerDetailsForm = (e) => {
    setHandleOrganizerDetails(prev => {
      prev[e.target.name] = e.target.value
      return { ...prev }
    })
  }

  const previous_Button = () => {
    setStateHandle_Event_Organiser_Preview(p => { p.event = !false; p.organise = !true; return { ...p } });
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
    <div>
      <form>
        <div className="input-details">
          <label>Organizer Name</label>
          <input
            name="organizerName"
            type="text"
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
              // min="1"
              max="9"
              required
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
            placeHolder="Enter keyword"
          />
          {
            checkReqierdField &&
            tags.length < 1 && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
          }
        </div>

        {/* {stateHandle_Event_Organiser_Preview?.organise === true ? ( */}
        {/* <div className="card-3 next-button">
        </div> */}
        <div className="card-3 next-button">
          <button type="click" onClick={(e) => previous_Button(e)}>Previous</button>
          <button type="submit" onClick={(e) => onSubmit(e)} style={{marginRight:'10px'}}>Next</button>
        </div>
        {/* ) : (
          ""
        )} */}
      </form>
    </div>
  );
};

export default Organizerdetails;